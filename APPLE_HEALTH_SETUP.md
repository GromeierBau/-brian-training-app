# Apple Health / HealthKit Integration

Die aktuelle `index.html` ist eine Web-App. Apple Health (HealthKit) kann aus Safari bzw. einer normalen Web-App nicht direkt gelesen oder beschrieben werden. Die HealthKit-Anbindung muss deshalb im nativen iOS-Projekt (`Brians_Training_iOS_Source.zip`) umgesetzt werden.

## Geplante Daten

Lesen aus Apple Health:
- Schritte (`HKQuantityTypeIdentifierStepCount`)
- aktive Energie (`HKQuantityTypeIdentifierActiveEnergyBurned`)
- Herzfrequenz (`HKQuantityTypeIdentifierHeartRate`)
- Ruhepuls (`HKQuantityTypeIdentifierRestingHeartRate`)
- Körpergewicht (`HKQuantityTypeIdentifierBodyMass`)
- Körperfett (`HKQuantityTypeIdentifierBodyFatPercentage`)
- Workouts (`HKObjectType.workoutType()`)

Schreiben nach Apple Health:
- Körpergewicht
- Workouts
- Nahrungsenergie (`HKQuantityTypeIdentifierDietaryEnergyConsumed`)
- Eiweiß (`HKQuantityTypeIdentifierDietaryProtein`)
- Kohlenhydrate (`HKQuantityTypeIdentifierDietaryCarbohydrates`)
- Fett (`HKQuantityTypeIdentifierDietaryFatTotal`)

## Erforderliche iOS-Konfiguration

1. Xcode Target > Signing & Capabilities > `+ Capability` > HealthKit.
2. In `Info.plist` müssen `NSHealthShareUsageDescription` und `NSHealthUpdateUsageDescription` gesetzt werden.
3. Beim ersten Öffnen der Health-Funktion wird `HKHealthStore.requestAuthorization` aufgerufen. Apple zeigt die Freigabeoberfläche; der Nutzer entscheidet je Datentyp selbst.
4. Die App darf nur Daten verwenden, für die der Nutzer Health-Zugriff freigegeben hat.

## UI in Brians Training & Ernährung

In der Übersicht soll eine Karte `Apple Health` erscheinen mit:
- Verbinden / Zugriff anfordern
- Schritte heute
- aktive kcal heute
- letzter Ruhepuls
- aktuelles Gewicht
- Status der letzten Synchronisierung

Die Web-Version darf keinen falschen Health-Zugriff simulieren. Health-Werte werden nur angezeigt, wenn sie tatsächlich vom nativen iOS-Teil geliefert wurden.

## Technischer nächster Schritt

Der native iOS-Quellcode liegt derzeit nur als ZIP-Datei im Repository. Für eine saubere, direkt wartbare HealthKit-Implementierung sollte das Xcode-Projekt entpackt als normale Dateien in das Repository eingecheckt werden. Dann können `HealthKitManager.swift`, Entitlements, Info.plist und die SwiftUI-Ansicht direkt versioniert und aktualisiert werden.
