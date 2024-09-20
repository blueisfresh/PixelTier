### Projektablauf für PixelTiler

1. **Projektplanung & Pflichtenheft**

   - Definiere genau, was das Projekt können muss (z.B. Bild hochladen, Mosaik erstellen).
   - Erstelle eine Übersicht der Anforderungen und Einschränkungen (z.B. nur ganze Zahlen für Steingrößen).

   **Wichtige Inhalte für das Pflichtenheft**:

   - **Projektbeschreibung**: Kurze Zusammenfassung des Projekts.
   - **Funktionalitäten**: Was der Benutzer machen kann (z.B. Bild hochladen, Mosaik anpassen).
   - **Technische Anforderungen**: Welche Technologien du verwenden wirst (HTML, CSS, JavaScript, JSON, Canvas).
   - **JSON-Verwendung**: Erklärung, wie das Projekt auf die Daten zugreift.
   - **Benutzeroberfläche**: Skizze oder Beschreibung der Formulare und deren Funktionsweise.
   - **Ablauf des Mosaik-Prozesses**: Wie das Bild verarbeitet und das Mosaik erstellt wird.

2. **Erstelle das Grundgerüst der Website (HTML + CSS)**

   - Setze das HTML-Formular auf und positioniere es mittig mit abgerundeten Rändern.
   - **CSS**: Nutze Flexbox oder Grid für das Zentrieren des Formulars. (siehe vorheriges Beispiel)
   - Füge Eingabefelder für Bild-Upload, Mosaikgröße, Abstand, und Steinwahl hinzu.

3. **Verstehe Canvas & Bildbearbeitung**

   - Lerne, wie Canvas funktioniert und wie du das hochgeladene Bild verarbeitest.
   - Verwende Canvas, um das Bild zu laden und die Farbwerte der Pixel zu analysieren.

4. **JSON-Daten einbinden**

   - **Lerne, wie du JSON in JavaScript einliest** (siehe Code-Beispiele im vorherigen Beitrag).
   - Die besten Wege, um JSON zu lesen:
     - **fetch API**: Der moderne und beste Weg.
     - **Direktes Einbinden**: Nur für statische JSON-Daten.
     - **XMLHttpRequest**: Der ältere, aber immer noch benutzbare Weg.

   **fetch API Codebeispiel**:

   ```javascript
   fetch("materials.json")
     .then((response) => response.json())
     .then((data) => console.log(data));
   ```

5. **Mosaikberechnung und Anzeige**

   - Verarbeite das Bild mit den ausgewählten Mosaikparametern.
   - Ersetze die Bereiche des Bildes durch farblich passende Mosaiksteine basierend auf den Hex-Codes aus dem JSON.

6. **Überprüfen und Anpassen**
   - Teste das gesamte Projekt.
   - Optimiere die Performance und das Layout.

---

### Wichtige Inhalte im Pflichtenheft

- **Projektübersicht**:
  - Kurzbeschreibung, was das Programm tun soll.
- **Zielgruppe**:
  - Wer wird das Projekt nutzen (z.B. Benutzer, die Kunstprojekte erstellen).
- **Technischer Ablauf**:
  - Wie wird das Bild in ein Mosaik umgewandelt? (Schritte vom Bild-Upload bis zur Berechnung des Mosaiks).
- **Technologien**:
  - Verwende HTML5, CSS3, JavaScript (pur), JSON, und Canvas.
- **Mosaik-Konfiguration**:
  - Größe, Abstand, Materialtyp, Steingrößen, und wie diese Daten verwendet werden.
