-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 04. 13:49
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `jelszo` text NOT NULL,
  `keresztnev` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefonszam` varchar(20) DEFAULT NULL,
  `regisztracio_datum` datetime DEFAULT current_timestamp(),
  `vezeteknev` varchar(50) NOT NULL,
  `tipus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglaltvadaszat`
--

CREATE TABLE `foglaltvadaszat` (
  `foglalt_vadaszat_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `helyszin_id` int(11) DEFAULT NULL,
  `vadfaj_id` int(11) DEFAULT NULL,
  `kezdete` datetime DEFAULT NULL,
  `vege` datetime DEFAULT NULL,
  `statusz` enum('lefoglalt','teljesitve','lemondva') DEFAULT 'lefoglalt'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyszin`
--

CREATE TABLE `helyszin` (
  `helyszin_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `telepules` varchar(255) DEFAULT NULL,
  `irszam` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vadfaj`
--

CREATE TABLE `vadfaj` (
  `vadfaj_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `helyszin_id` (`helyszin_id`),
  ADD KEY `vadfaj_id` (`vadfaj_id`);

--
-- A tábla indexei `helyszin`
--
ALTER TABLE `helyszin`
  ADD PRIMARY KEY (`helyszin_id`);

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
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  MODIFY `foglalt_vadaszat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `helyszin`
--
ALTER TABLE `helyszin`
  MODIFY `helyszin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `vadfaj`
--
ALTER TABLE `vadfaj`
  MODIFY `vadfaj_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  ADD CONSTRAINT `foglaltvadaszat_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`),
  ADD CONSTRAINT `foglaltvadaszat_ibfk_2` FOREIGN KEY (`helyszin_id`) REFERENCES `helyszin` (`helyszin_id`),
  ADD CONSTRAINT `foglaltvadaszat_ibfk_3` FOREIGN KEY (`vadfaj_id`) REFERENCES `vadfaj` (`vadfaj_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
