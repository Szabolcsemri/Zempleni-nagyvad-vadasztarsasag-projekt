![image](https://github.com/user-attachments/assets/ea900f47-2409-4127-a814-5a8c639bcd1e)
# Szent István Katolikus Technikum és Gimnázium 

# Zempléni Nagyvad Vadásztársaság

## Készítők
- **Adatbázis**: Semsei István
- **Front-end és csapatvezetői feladatok**: Emri Szabolcs
- **Back-end**: Benkő Bálint

## Leírás
A Zempléni Nagyvad Vadásztársaság weboldala segítséget nyújt a vadászatok szervezésében. Az oldal lehetőséget biztosít a felhasználók számára, hogy csatlakozzanak egy már létrehozott vadászathoz. Nincs más teendő, mint regisztrálni és bejelentkezni az oldalra.

Az oldal nemcsak vadászok számára hasznos, hanem azok számára is, akik szeretnének többet megtudni a vadászatról. Az enciklopédia és a képgaléria révén az érdeklődők is értékes információkhoz juthatnak. A projekt egy helyi vadásztársaság számára készült, és minden szükséges információt tőlük kaptunk, teljes beleegyezésükkel.

---

## Rendszerkövetelmények
### **Minimum**
- **Operációs rendszer**: Windows 10
- **Processzor**: 1 GHz vagy gyorsabb
- **Tárhely**: 6 GB szabad hely
- **Memória**: 4 GB RAM
- **Böngésző**: Google Chrome

### **Ajánlott**
- **Operációs rendszer**: Windows 10
- **Processzor**: 2 GHz vagy gyorsabb
- **Tárhely**: 6 GB szabad hely
- **Memória**: 6 GB RAM
- **Böngésző**: Google Chrome

---

## Fejlesztéshez használt szoftverek
- **Visual Studio Code**: 1.98.2
- **Node.js**: 20.18.0
- **Angular CLI**: 16.2.16
- **XAMPP**: 8.1.1

---

## Üzembehelyezés menete fejlesztéshez

### 1. Szükséges szoftverek telepítése
1. **Node.js (20.18.0 vagy újabb)** LTS verzió telepítése: [Node.js letöltés](https://nodejs.org/en/download)
2. **XAMPP (8.1.1 vagy újabb)** telepítése: [XAMPP letöltés](https://www.apachefriends.org/hu/download.html)
3. **Angular CLI (16.2.16)** telepítése parancssorban:
   ```sh
   npm install -g @angular/cli@16
   ```

### 2. Projekt letöltése
- Klónozza a projektet **GitHub Desktop** segítségével VAGY töltse le ZIP állományként és csomagolja ki.

### 3. Adatbázis beállítása
1. Indítsa el a **XAMPP**-ot.
2. Nyissa meg a **phpMyAdmin** felületet.
3. Importálja az **SQL fájlt** a projekt mappájából az adatbázisba.

### 4. Front-end beállítása
1. Nyissa meg a projektet **Visual Studio Code** fejlesztői környezetben.
2. Nyisson meg egy terminált, majd navigáljon a **Front-end** mappába.
3. Telepítse a szükséges csomagokat:
   ```sh
   npm install
   ```
4. Indítsa el a frontendet:
   ```sh
   ng serve --open
   ```

### 5. Back-end beállítása
1. Nyisson egy új terminált, majd navigáljon a **Back-end** mappába.
2. Telepítse a szükséges csomagokat:
   ```sh
   npm install
   ```
3. Hozzon létre egy **.env** fájlt a Back-end mappában, és adjon meg egy JWT_SECRET környezeti változót:
   ```env
   JWT_SECRET=titkoskulcs123
   ```
4. Indítsa el a backendet:
   ```sh
   npm run dev
   ```

---

 **A projekt készen áll a fejlesztésre!**
