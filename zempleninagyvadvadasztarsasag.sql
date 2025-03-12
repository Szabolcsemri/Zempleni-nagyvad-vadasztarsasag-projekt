-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 12. 19:35
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
  `regisztracio_datum` datetime DEFAULT NULL,
  `vezeteknev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `tipus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_id`, `jelszo`, `keresztnev`, `email`, `regisztracio_datum`, `vezeteknev`, `tipus`) VALUES
(39, '$2b$10$WcLuRsKeFHzyhwdilSSI9.bEL1PMwR6GXExz3NWYTUDS.0Y7pFcxC', 'Bence', 'bence.kovacs@example.com', '2025-03-12 17:14:35', 'Kovács', 1),
(40, '$2b$10$A6c2fqt6/xtWpCULhJLP/.uzhsGs/7Qi6Ol6Wgmgl9KatG1mn9QbC', 'Anna', 'anna.nagy@example.com', '2025-03-12 17:15:13', 'Nagy', 0),
(41, '$2b$10$dinoo33hbNL6qWvR1F4.quJ.kAsh4xpdiKstQ7ya1bxDPiIn81hwu', 'Levente', 'levente.toth@example.com', '2025-03-12 17:15:39', 'Tóth', 0),
(42, '$2b$10$4TO.7JtjHbXLvXBjOYPbVu.ZGdKGu8Gu5Rr24DRMdgZzxA5bebryK', 'Dóra', 'dora.szabo@example.com', '2025-03-12 17:16:34', 'Szabó', 0),
(43, '$2b$10$cL1MPl1yHvX.EdQxWrYU7OfKLbDvZQjC7N2eQiX6E/cbxtrTAkgl.', 'Gábor', 'gabor.varga@example.com', '2025-03-12 17:16:57', 'Varga', 0),
(44, '$2b$10$ZB7nxdgIesiQXi4Q2EsmSOser9.Hhu7Y5cQCApc3x.XgLA8GMR0JK', 'Éva', 'eva.kiss@example.com', '2025-03-12 17:17:21', 'Kiss', 0);

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
  `letrehozo_felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `foglaltvadaszat`
--

INSERT INTO `foglaltvadaszat` (`foglalt_vadaszat_id`, `helyszin_id`, `vadfaj_id`, `kezdete`, `vege`, `letrehozo_felhasznalo_id`) VALUES
(45, 2, 3, '2025-11-13 00:00:00', '2025-11-18 00:00:00', 39),
(46, 5, 4, '2025-11-21 00:00:00', '2025-11-25 00:00:00', 40),
(47, 5, 3, '2025-08-22 00:00:00', '2025-08-25 00:00:00', 41),
(48, 1, 5, '2025-07-26 00:00:00', '2025-07-29 00:00:00', 43),
(49, 4, 4, '2025-11-08 00:00:00', '2025-11-10 00:00:00', 43),
(50, 3, 4, '2025-11-09 00:00:00', '2025-11-11 00:00:00', 44);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `helyszin`
--

CREATE TABLE `helyszin` (
  `helyszin_id` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `helyszin`
--

INSERT INTO `helyszin` (`helyszin_id`, `nev`) VALUES
(1, 'Liget'),
(2, 'Szicsok'),
(3, 'Mogyorós'),
(4, 'Gyertyán hegy'),
(5, 'Fekete hegy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vadaszat_fehlasznalo_kapcsolat`
--

CREATE TABLE `vadaszat_fehlasznalo_kapcsolat` (
  `foglalt_vadaszat_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `vadaszat_fehlasznalo_kapcsolat`
--

INSERT INTO `vadaszat_fehlasznalo_kapcsolat` (`foglalt_vadaszat_id`, `felhasznalo_id`) VALUES
(45, 39),
(45, 41),
(46, 39),
(46, 40),
(47, 41),
(47, 44),
(48, 43),
(49, 43),
(50, 44);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vadfaj`
--

CREATE TABLE `vadfaj` (
  `vadfaj_id` int(11) NOT NULL,
  `nev` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `foto_url` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `vadfaj`
--

INSERT INTO `vadfaj` (`vadfaj_id`, `nev`, `foto_url`) VALUES
(1, 'Vaddisznó', 'vaddisznó.jpg'),
(2, 'Szarvas bika', 'szarvas bika.jpeg'),
(3, 'Őzbak', 'őzbak.jpg'),
(4, 'Fácán', 'fácán.jpg'),
(5, 'Muflon', 'muflon.jpg');

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
  ADD KEY `vadfaj_id` (`vadfaj_id`),
  ADD KEY `fk_letrehozo_felhasznalo` (`letrehozo_felhasznalo_id`);

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
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT a táblához `foglaltvadaszat`
--
ALTER TABLE `foglaltvadaszat`
  MODIFY `foglalt_vadaszat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
  ADD CONSTRAINT `fk_letrehozo_felhasznalo` FOREIGN KEY (`letrehozo_felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`) ON DELETE CASCADE,
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
