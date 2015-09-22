-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: internal-db.s153413.gridserver.com
-- Generation Time: Nov 10, 2012 at 11:51 AM
-- Server version: 5.1.55-rel12.6
-- PHP Version: 5.3.15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db153413_ntfb`
--

-- --------------------------------------------------------

--
-- Table structure for table `FoodEntries`
--

CREATE TABLE IF NOT EXISTS `FoodEntries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemTypeId` int(11) NOT NULL,
  `datetime` datetime NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `amount` (`amount`),
  KEY `itemTypeId` (`itemTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `FoodEntries`
--

INSERT INTO `FoodEntries` (`id`, `itemTypeId`, `datetime`, `amount`) VALUES
(1, 1, '2012-11-09 00:00:00', 20),
(2, 1, '2012-11-09 00:01:00', 20),
(3, 1, '2012-11-09 00:02:00', 20),
(4, 2, '2012-11-08 00:00:00', 50),
(5, 2, '2012-11-10 00:00:00', 24);

-- --------------------------------------------------------

--
-- Table structure for table `FoodTypes`
--

CREATE TABLE IF NOT EXISTS `FoodTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `FoodTypes`
--

INSERT INTO `FoodTypes` (`id`, `name`) VALUES
(1, 'Potatoes'),
(2, 'Tomatoes');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `FoodEntries`
--
ALTER TABLE `FoodEntries`
  ADD CONSTRAINT `FoodEntries_ibfk_1` FOREIGN KEY (`itemTypeId`) REFERENCES `FoodTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
