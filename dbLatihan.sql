-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 14, 2024 at 02:54 PM
-- Server version: 5.7.44
-- PHP Version: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbLatihan`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(11, 'iman', 'iman@ok.com', '$2a$10$Da64EhdMzksBKgvgd4liheuU5zBsir72n29GTfcAIngrdjkKiqI/m', '2024-11-14 11:47:14', '2024-11-14 11:47:14'),
(12, 'joko', 'joko@ok.com', '$2a$10$cB6tNbDSLb42Sj8GcONZ4e8/WUxSseAenaqSHv9Z/tML2lWv311xS', '2024-11-14 11:48:45', '2024-11-14 11:48:45'),
(13, 'jeki', 'jeki#chan.com', '$2a$10$4X40M8Ts9WDaak.BD2dVl./qys5YJHw2piMEe4p1VhBBrcM5LF5Xi', '2024-11-14 13:45:09', '2024-11-14 13:45:09'),
(14, 'rani', 'rani@rono.com', '$2a$10$FFSim0C1TfDgX7av4VcC1uGmoxOZkrvjsjtqmkvJLayRy2VKLN7me', '2024-11-14 13:47:02', '2024-11-14 13:47:02'),
(15, 'jalu', 'jalu@jali.com', '$2a$10$Yh0bwbWsLF8UcowJahts7.qzlB8k6M0fOX1IGwmqzcZDjNgx4TT8i', '2024-11-14 13:51:03', '2024-11-14 13:51:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
