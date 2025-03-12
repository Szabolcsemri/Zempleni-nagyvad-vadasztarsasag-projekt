-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 03. 07:04
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `zempleninagyvadvadasztarsasag`
--
CREATE DATABASE IF NOT EXISTS `zempleninagyvadvadasztarsasag` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `zempleninagyvadvadasztarsasag`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `jelszo` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `keresztnev` varchar(40) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `telefonszam` varchar(20) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `regisztracio_datum` datetime DEFAULT NULL,
  `vezeteknev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `tipus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglaltvadaszat`
--

CREATE TABLE `foglaltvadaszat` (
  `foglalt_vadaszat_id` int(11) NOT NULL,
  `helyszin_id` int(11) DEFAULT NULL,
  `vadfaj_id` int(11) DEFAULT NULL,
  `kezdete` datetime DEFAULT NULL,
  `vege` datetime DEFAULT NULL,
  `statusz` enum('lefoglalt','teljesitve','lemondva') COLLATE utf8_hungarian_ci DEFAULT 'lefoglalt'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `foglaltvadaszat`
--

INSERT INTO `foglaltvadaszat` (`foglalt_vadaszat_id`, `helyszin_id`, `vadfaj_id`, `kezdete`, `vege`, `statusz`) VALUES
(11, 1, 1, '2025-03-15 06:00:00', '2025-03-15 12:00:00', 'lefoglalt'),
(12, 2, 2, '2025-04-10 05:30:00', '2025-04-10 11:30:00', 'lefoglalt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyszin`
--

CREATE TABLE `helyszin` (
  `helyszin_id` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `telepules` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `irszam` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `helyszin`
--

INSERT INTO `helyszin` (`helyszin_id`, `nev`, `leiras`, `telepules`, `irszam`) VALUES
(1, 'Liget', 'Sűrű erdős vidék, gazdag vadvilággal.', 'Eger', '3300'),
(2, 'Szicsok', 'Hegyes-dombos táj, vaddisznók és szarvasok élőhelye.', 'Sárospatak', '3950'),
(3, 'Mogyorós', 'Nyílt terep, főként őz és fácán vadászat.', 'Gödöllő', '2100'),
(4, 'Gyertyán hegy', 'Sziklás vidék, különleges állatfajokkal.', 'Pécs', '7621'),
(5, 'Fekete hegy', 'Gyönyörű erdős terület gazdag vadállománnyal.', 'Bakonybél', '8427');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vadaszat_fehlasznalo_kapcsolat`
--

CREATE TABLE `vadaszat_fehlasznalo_kapcsolat` (
  `foglalt_vadaszat_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vadfaj`
--

CREATE TABLE `vadfaj` (
  `vadfaj_id` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `foto_url` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `vadfaj`
--

INSERT INTO `vadfaj` (`vadfaj_id`, `nev`, `leiras`, `foto_url`) VALUES
(1, 'Vaddisznó', 'Nagy testű vad, főként éjszaka aktív.', 'vaddisznó.jpg'),
(2, 'Szarvas bika', 'Impozáns agancsú szarvasféle, nagy vadászkedvenc.', 'szarvas bika.jpeg'),
(3, 'Őzbak', 'Kis termetű, gyors vad, gyakori hazánkban.', 'őzbak.jpg'),
(4, 'Fácán', 'Színpompás madár, elsősorban mezőkön található.', 'fácán.jpg'),
(5, 'Muflon', 'Gyors és ügyes hegyi vad, kiváló trófeával.', 'muflon.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  ADD PRIMARY KEY (`foglalt_vadaszat_id`),
  ADD KEY `helyszin_id` (`helyszin_id`),
  ADD KEY `vadfaj_id` (`vadfaj_id`);

--
-- A tábla indexei `helyszin`
--
ALTER TABLE `helyszin`
  ADD PRIMARY KEY (`helyszin_id`);

--
-- A tábla indexei `vadaszat_fehlasznalo_kapcsolat`
--
ALTER TABLE `vadaszat_fehlasznalo_kapcsolat`
  ADD PRIMARY KEY (`foglalt_vadaszat_id`,`felhasznalo_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `vadfaj`
--
ALTER TABLE `vadfaj`
  ADD PRIMARY KEY (`vadfaj_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  MODIFY `foglalt_vadaszat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `helyszin`
--
ALTER TABLE `helyszin`
  MODIFY `helyszin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `vadfaj`
--
ALTER TABLE `vadfaj`
  MODIFY `vadfaj_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  ADD CONSTRAINT `foglaltvadaszat_ibfk_2` FOREIGN KEY (`helyszin_id`) REFERENCES `helyszin` (`helyszin_id`),
  ADD CONSTRAINT `foglaltvadaszat_ibfk_3` FOREIGN KEY (`vadfaj_id`) REFERENCES `vadfaj` (`vadfaj_id`);

--
-- Megkötések a táblához `vadaszat_fehlasznalo_kapcsolat`
--
ALTER TABLE `vadaszat_fehlasznalo_kapcsolat`
  ADD CONSTRAINT `vadaszat_fehlasznalo_kapcsolat_ibfk_1` FOREIGN KEY (`foglalt_vadaszat_id`) REFERENCES `foglaltvadaszat` (`foglalt_vadaszat_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vadaszat_fehlasznalo_kapcsolat_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
