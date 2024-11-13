-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2021 at 02:39 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techbase`
--
CREATE DATABASE IF NOT EXISTS `techbase` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `techbase`;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `level` tinyint(2) UNSIGNED NOT NULL DEFAULT '1',
  `status` enum('active','delete') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `code`, `parent_id`, `level`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
(1, 'Director', 'DRT', 0, 1, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'IT 1', 'IT1', 1, 2, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'IT 2', 'IT2', 1, 2, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Accounting', 'ACC', 1, 2, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Admin', 'AD', 1, 2, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'IT 1.1', 'IT1.1', 2, 3, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'IT 1.2', 'IT1.2', 2, 3, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'IT 2.1', 'IT2.1', 3, 3, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'IT 2.2', 'IT2.2', 3, 3, 'active', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `status` enum('active','delete') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `name`, `code`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
(1, 'Director', 'DRT01', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Manager', 'MNG01', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Leader', 'LD01', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Team Leader', 'TLD01', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Employee', 'ELE', 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Partnership', 'PNS', 'active', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `staff_no` varchar(50) NOT NULL,
  `position_id` int(10) UNSIGNED DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `status` enum('active','delete') NOT NULL DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `staff_no`, `position_id`, `birthday`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
(1, 'John Doe 1', 'john.doe1@gmail.com', '$2b$09$zefeWLYSJwDxQaa7egIBHefBa.Qiod1Z6DwSyvumhi5X7w8LeYsLG', 'j_doe1', 1, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'John Doe 2', 'john.doe2@gmail.com', '$2b$04$YQbkI.9OU4jHbZLht4WS..r5LCISb0.RT.N3zOJ/x4IzV9oG5qD/m', 'j_doe2', 2, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'John Doe 3', 'john.doe3@gmail.com', '$2b$09$f89g4Sd.7OuT3Kpof.wIz.Te5J8i4nuR3DFFtbxACMRDYNBpFN/9a', 'j_doe3', 2, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Jane Doe 1', 'jane.doe1@gmail.com', '$2b$06$D12tQxtJ6owMJGH/G7yubus.eVZaRMWXlGm2WKCWmJav8yOWKwEMu', 'ja_doe1', 2, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Jane Doe 2', 'jane.doe2@gmail.com', '$2b$09$70QzDGD6dQP8FKEQtjq7iOnYRWlzkBw/3yi6Uyb9MYNT8mzaGgvjW', 'ja_doe2', 2, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'John Doe 4', 'john.doe4@gmail.com', '$2b$04$6eYhQHZTlU7iYQ8dkJF1U.22L4lymGN.nwoyvxJ2YKY.is.Yuc41i', 'j_doe4', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'John Doe 5', 'john.doe5@gmail.com', '$2b$08$/jDvyXp0MC0vFn4XwZt2fumU.fPK3qVPq2zPWoBlY3scszM7e8zLO', 'j_doe5', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'John Doe 6', 'john.doe6@gmail.com', '$2b$04$mJpXBELl8W5dfADdnE0HJO8l3hBmyYvpBBp7DSZ63nVWY9tL9pv0.', 'j_doe6', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'John Doe 7', 'john.doe7@gmail.com', '$2b$04$vO1X.5eU46CnBcwccvf3A.LqeoPmY0fB0MvfoQ7LrAvj7tVbzp85W', 'j_doe7', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'John Doe 8', 'john.doe8@gmail.com', '$2b$04$/YfT4fNM.7zjVvb7WL.M1um3tTlrSO6nG7kmTJtvsSq7yJwZOaODC', 'j_doe8', 4, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'John Doe 9', 'john.doe9@gmail.com', '$2b$10$2VWMZgjhMDb0wQbTOdsLyOg/XL6upWKvhYOuuiCJRJb0t5.UePSFi', 'j_doe9', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'John Doe 10', 'john.doe10@gmail.com', '$2b$04$XFOq6nWtknE/L6JWRU/dlOuGxRCFF/U1gvT6.zCUWm1M3zsj3um/i', 'j_doe10', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Jane Doe 3', 'jane.doe3@gmail.com', '$2b$09$7eYCKruppDyuLaMqoV5Pf.JVRslin2ZoZoLPL8yTXt4n9GadgfCJ2', 'ja_doe3', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Jane Doe 4', 'jane.doe4@gmail.com', '$2b$04$yLCD0TByL1O9LEoCAY4/hO0hcXXKz9rSWCF/jqt1fBxRruB7xclN2', 'ja_doe4', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Jane Doe 5', 'jane.doe5@gmail.com', '$2b$05$fd6stvemL7oxbC95BjzG4.ICUZ3oYWls9yZSOaoP7dLd04DQH.Loy', 'ja_doe5', 6, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'John Doe 11', 'john.doe11@gmail.com', '$2b$05$CWDQPLDYmvIJ6vE4Oq1ctekp8BUSyk46RzZmJD/KGy8JYQBm2T/ki', 'j_doe11', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'John Doe 12', 'john.doe12@gmail.com', '$2b$09$M9fc5DK5ukjgn8XJxDBTMup35/TmVOryvwyGwf.T8cLTojN0GRbOq', 'j_doe12', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'John Doe 13', 'john.doe13@gmail.com', '$2b$08$z9mdDDBnuHUy0FH1xQOVW.tjNBMZRSBIN7yO8xjshOTLiWsR1jJxu', 'j_doe13', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'John Doe 14', 'john.doe14@gmail.com', '$2b$07$xcAMkQpE8K/oHC8hZCa/z.Jw67TeezFF193rehgNgn3XTu2KtR2uy', 'j_doe14', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Jane Doe 6', 'jane.doe6@gmail.com', '$2b$08$eJeIFqtthwrLh/EnGtOLOeCqZYdir07QyvitEOdEJWXDhwINA8LTW', 'ja_doe6', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Jane Doe 7', 'jane.doe7@gmail.com', '$2b$04$vdfQuf6ziT6kEDbU.iJXteqj.lQNv.5m8PxfNDyZ9e5t74x0rC3rG', 'ja_doe7', 3, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Jane Doe 8', 'jane.doe8@gmail.com', '$2b$04$JazY5pF/y3uFuO6kunbiR.Exajb28K5M1TPp1BPg1tboRB61xZKiy', 'ja_doe8', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Jane Doe 9', 'jane.doe9@gmail.com', '$2b$05$5EgHACI8wzdicLtBIzdkreR.q0v/oa2G.awUVZOjxdHk1N0B2W58K', 'ja_doe9', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Jane Doe 10', 'jane.doe10@gmail.com', '$2b$04$.m3AXy2D0hW8plPR7jOStu9J5gKquuaW3RZLVOK4Sf3RCDV2lNABG', 'ja_doe10', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'Jane Doe 11', 'jane.doe11@gmail.com', '$2b$09$fFQZXeHfjTtH5kaNWwImK.gVf4i9fGEockEu5QPCAfuxVG60lXQHm', 'ja_doe11', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'Jane Doe 12', 'jane.doe12@gmail.com', '$2b$04$ilCxmzGmU2ZhN8OPVPr3MOjZSjgp0FTvl8d1Jep9MMCgzNi3MptsO', 'ja_doe12', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'Jane Doe 13', 'jane.doe13@gmail.com', '$2b$06$U4AdTOqnTBcj/3ZoeF1EqumlWcMYmJPYj8AJai8kfcY0HT92AYrdm', 'ja_doe13', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'Jane Doe 14', 'jane.doe14@gmail.com', '$2b$09$whBYJ9j3nTJhJbK3MwPdnOL3tLzmMbGjZAgcmsBZhNAJ1uhw.xUDq', 'ja_doe14', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Jane Doe 15', 'jane.doe15@gmail.com', '$2b$06$V5WKw9oqw1PPqFh8u0A4iu4DQs0G1wSc3iWHQQ3kxt4JddDXS7qGO', 'ja_doe15', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'Jane Doe 16', 'jane.doe16@gmail.com', '$2b$07$GSMEkf.eA0K9z0FEylVek.hc6Evz00wjr/lrSQzL5Sr4iLBw3MwsC', 'ja_doe16', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Jane Doe 17', 'jane.doe17@gmail.com', '$2b$04$zkCLnJ8swpj2mhEdIoqOe.skRpxNKQw5ycc38WW8eFHAx0AKAXsha', 'ja_doe17', 5, NULL, 'active', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_organization`
--

CREATE TABLE `user_organization` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `organization_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_organization`
--

INSERT INTO `user_organization` (`user_id`, `organization_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 6),
(11, 6),
(13, 6),
(14, 6),
(15, 6),
(12, 6),
(16, 7),
(17, 7),
(18, 7),
(19, 7),
(19, 6),
(20, 4),
(21, 5),
(22, 5),
(23, 5),
(24, 4),
(25, 4),
(26, 4),
(27, 4),
(28, 5),
(29, 5),
(30, 9),
(31, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
