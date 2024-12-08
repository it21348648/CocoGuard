
#include <SoftwareSerial.h>
SoftwareSerial mod(14, 12); // RX, TX

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128    // OLED display width, in pixels
#define SCREEN_HEIGHT 64    // OLED display height, in pixels
#define OLED_RESET -1       // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define RE 2
#define DE 0
const byte temp[] = {0x01,0x03, 0x00, 0x12, 0x00, 0x02, 0x64, 0x0E};

const byte mois[]  = {0x01,0x03,0x00,0x12,0x00,0x01,0x24,0x0F};
const byte econ[] = {0x01,0x03, 0x00, 0x15, 0x00, 0x01, 0x95, 0xCE};
const byte ph[] = {0x01,0x03, 0x00, 0x06, 0x00, 0x01, 0x64, 0x0B};//0x0B64

const byte nitro[] = {0x01, 0x03, 0x00, 0x1e, 0x00, 0x01, 0xe4, 0x0c};
const byte phos[] = {0x01, 0x03, 0x00, 0x1F, 0x00, 0x01, 0xB5, 0xCC};
const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

byte values[11];
SoftwareSerial mod(14,12);


// Add validateCRC function here
bool validateCRC(byte *data, byte length) {
    uint16_t crc = 0xFFFF;
    for (byte i = 0; i < length - 2; i++) {
        crc ^= data[i];
        for (byte j = 0; j < 8; j++) {
            if (crc & 0x0001)
                crc = (crc >> 1) ^ 0xA001;
            else
                crc >>= 1;
        }
    }
    uint16_t receivedCRC = (data[length - 1] << 8) | data[length - 2];
    return crc == receivedCRC;
}


void setup() {
  Serial.begin(4800);
  mod.begin(4800);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); //initialize with the I2C addr 0x3C (128x64)
  delay(500);
  display.clearDisplay();
  display.setCursor(25, 15);
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.println(" NPK Sensor");
  display.setCursor(25, 35);
  display.setTextSize(1);
  display.print("Initializing");
  display.display();
  delay(3000);
}

void loop() {
  float soil_temp = 0.0,soil_ph = 0.0, soil_mois = 0.0;
  byte val1,val2,val3,val4=1,val5=1,val6=1;
  val1 = nitrogen();
  delay(1000);

  val2 = phosphorous();
  delay(1000);

  val3 = potassium();
  delay(1000);

  soil_temp = temperature()/10.0;
  delay(1000);

  val4 = phydrogen()/25;
  soil_ph = val4;
  delay(1000);

  val5 = moisture();
  soil_mois = val5/1.8;
  delay(1000);

  val6 = econduc();
  delay(1000);

  // Debugging output for the serial monitor

  Serial.print("Moisture: ");
  Serial.print(soil_mois);
  Serial.println(" %");
  delay(1000);


  Serial.print("Temperature: ");
  Serial.print(soil_temp);
  Serial.println(" C");
  delay(1000);

  Serial.print("ph: ");
  Serial.print(soil_ph);
  Serial.println(" ph");
  delay(1000);


  Serial.print("EC: ");
  Serial.print(val6);
  Serial.println(" us/cm");
  delay(1000);

  Serial.print("Nitrogen: ");
  Serial.print(val1);
  Serial.println(" mg/kg");
  delay(1000);

  

  Serial.print("Phosphorous: ");
  Serial.print(val2);
  Serial.println(" mg/kg");
  delay(1000);

  Serial.print("Potassium: ");
  Serial.print(val3);
  Serial.println(" mg/kg");
  delay(1000);

  // Display all data with a uniform small font
display.clearDisplay();
display.setTextSize(1);

// Display Nitrogen
display.setCursor(0, 0);
display.print("N: ");
display.print(val1);
display.print(" mg/kg");

// Display Phosphorous
display.setCursor(0, 10);
display.print("P: ");
display.print(val2);
display.print(" mg/kg");

// Display Potassium
display.setCursor(0, 20);
display.print("K: ");
display.print(val3);
display.print(" mg/kg");

// Display pH
display.setCursor(0, 30);
display.print("pH: ");
display.print(soil_ph);

// Display Temperature
display.setCursor(0, 40);
display.print("Temp: ");
display.print(soil_temp);
display.print(" C");

// Display Moisture
display.setCursor(0, 50);
display.print("Moist: ");
display.print(soil_mois);
display.print(" %");

// Display EC
display.setCursor(0, 60);
display.print("EC: ");
display.print(val6);
display.print(" us/cm");

// Show the data on the OLED
display.display();
delay(3000);
}

byte temperature() {
  // Clear the receive buffer manually by reading any leftover data
  while (mod.available()) {
    mod.read();  // Discard any leftover data
  }

  // Switch RS-485 to transmit mode
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(1);

  // Write out the message
  for (byte i = 0; i < sizeof(temp); i++) {
    mod.write(temp[i]);
  }

  // Wait for the transmission to complete
  mod.flush();

  // Switch RS-485 to receive mode
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);

  // Delay to allow response bytes to be received!
  delay(200);

  // Read in the received bytes
  for (byte i = 0; i < 7; i++) {
    if (mod.available()) {
      values[i] = mod.read();
    }
  }

  return values[3] << 8 | values[4];
}

byte phydrogen() {
  // switch RS-485 to transmit mode
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);

  // write out the message
  for (byte i = 0; i < sizeof(ph); i++){
      mod.write(ph[i]);
  } 

  // wait for the transmission to complete
  mod.flush();

  // switching RS485 to receive mode
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);

  // delay to allow response bytes to be received!
  delay(200);

  // read in the received bytes
  for (byte i = 0; i < 7; i++) {
    values[i] = mod.read();
    // Serial.print(values[i], HEX);
    // Serial.print(' ');
  }
  // Serial.println();
  return values[4];
}

byte moisture() {
  // clear the receive buffer
  while (mod.available()) {
    mod.read();  // Discard any leftover data
  }

  // switch RS-485 to transmit mode
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);

  // write out the message
  for (byte i = 0; i < sizeof(mois); i++){
      mod.write(mois[i]);
  } 

  // wait for the transmission to complete
  mod.flush();

  // switching RS485 to receive mode
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);

  // delay to allow response bytes to be received!
  delay(200);

  // read in the received bytes
  for (byte i = 0; i < 7; i++) {
    values[i] = mod.read();
    // Serial.print(values[i], HEX);
    // Serial.print(' ');
  }
  // Serial.println();
  return values[4];
}


byte econduc() {
  while (mod.available()) {
    mod.read();  // Discard any leftover data
  }

  // switch RS-485 to transmit mode
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);

  // write out the message
  for (byte i = 0; i < sizeof(econ); i++){
       mod.write(econ[i]);
  }
  

  // wait for the transmission to complete
  mod.flush();

  // switching RS485 to receive mode
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);

  // delay to allow response bytes to be received!
  delay(200);

  // read in the received bytes
  for (byte i = 0; i < 7; i++) {
    values[i] = mod.read();
    // Serial.print(values[i], HEX);
    // Serial.print(' ');
  }
  // Serial.println();
  return values[4];
}


byte nitrogen() {
  // clear the receive buffer
  // Serial.println();
  while (mod.available()) {
    mod.read();  // Discard any leftover data
  }

  // switch RS-485 to transmit mode
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(1);

  // write out the message
  for (byte i = 0; i < sizeof(nitro); i++){
       mod.write(nitro[i]);
  }

  // wait for the transmission to complete
  mod.flush();

  // switching RS485 to receive mode
  digitalWrite(DE, LOW);
  digitalWrite(RE, LOW);

  // delay to allow response bytes to be received!
  delay(200);

  // read in the received bytes
  for (byte i = 0; i < 7; i++) {
    values[i] = mod.read();
    //  Serial.print(values[i], HEX);
    //  Serial.print(' ');
  }
  // Serial.println();
  return values[4];
}


byte phosphorous() {
    while (mod.available()) mod.read();  // Clear any leftover data
    digitalWrite(DE, HIGH);
    digitalWrite(RE, HIGH);
    delay(1);

    for (byte i = 0; i < sizeof(phos); i++) mod.write(phos[i]);
    mod.flush();

    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    delay(500);  // Increased delay for response

    byte response[7];  // Store the Modbus response
    for (byte i = 0; i < 7; i++) {
        if (mod.available()) response[i] = mod.read();
    }

    // Debug: Print the full response
    Serial.print("Phosphorous Response: ");
    for (byte i = 0; i < 7; i++) {
        Serial.print(response[i], HEX);
        Serial.print(' ');
    }
    Serial.println();

    // Validate CRC
    if (!validateCRC(response, 7)) {
        Serial.println("CRC Error for Phosphorous!");
        return 0;
    }

    return response[4];  // Extract the data byte
}

byte potassium() {
    while (mod.available()) mod.read();  // Clear any leftover data
    digitalWrite(DE, HIGH);
    digitalWrite(RE, HIGH);
    delay(1);

    for (byte i = 0; i < sizeof(pota); i++) mod.write(pota[i]);
    mod.flush();

    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    delay(500);  // Increased delay for response

    byte response[7];  // Store the Modbus response
    for (byte i = 0; i < 7; i++) {
        if (mod.available()) response[i] = mod.read();
    }

    // Debug: Print the full response
    Serial.print("Potassium Response: ");
    for (byte i = 0; i < 7; i++) {
        Serial.print(response[i], HEX);
        Serial.print(' ');
    }
    Serial.println();

    // Validate CRC
    if (!validateCRC(response, 7)) {
        Serial.println("CRC Error for Potassium!");
        return 0;
    }

    return response[4];  // Extract the data byte
}