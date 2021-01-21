-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2021 at 11:06 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `judgingcompetition`
--

-- --------------------------------------------------------

--
-- Table structure for table `adjucator_round`
--

CREATE TABLE `adjucator_round` (
  `adj_round_id` int(10) NOT NULL,
  `competition_event` int(10) NOT NULL,
  `round_id` int(10) NOT NULL,
  `competition_adjucator_id` int(10) NOT NULL,
  `competition_adjucator_sign` int(10) NOT NULL,
  `competition_adj_component` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adjucator_round`
--

INSERT INTO `adjucator_round` (`adj_round_id`, `competition_event`, `round_id`, `competition_adjucator_id`, `competition_adjucator_sign`, `competition_adj_component`) VALUES
(1, 1, 1, 3, 1, 1),
(2, 5, 2, 4, 2, 3),
(3, 1, 1, 4, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `adjucator_sign`
--

CREATE TABLE `adjucator_sign` (
  `adj_sign_id` int(11) NOT NULL,
  `adj_sign_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adjucator_sign`
--

INSERT INTO `adjucator_sign` (`adj_sign_id`, `adj_sign_name`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D'),
(5, 'E'),
(6, 'F'),
(7, 'G'),
(8, 'H'),
(9, 'I'),
(10, 'J'),
(11, 'K'),
(12, 'L');

-- --------------------------------------------------------

--
-- Table structure for table `competition`
--

CREATE TABLE `competition` (
  `competition_id` int(11) NOT NULL,
  `competition_date` date NOT NULL,
  `competition_event` int(10) NOT NULL,
  `competition_style` int(10) NOT NULL,
  `competition_category` int(10) NOT NULL,
  `competition_age_group` int(10) NOT NULL,
  `competition_num_round` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `competition_event`
--

CREATE TABLE `competition_event` (
  `comp_event_id` int(11) NOT NULL,
  `comp_event_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `competition_event`
--

INSERT INTO `competition_event` (`comp_event_id`, `comp_event_name`) VALUES
(1, 'WDSF World Open Championship'),
(2, 'WDSF International Open Championship'),
(3, 'WDSF European Championship'),
(4, 'WDSF World Cup');

-- --------------------------------------------------------

--
-- Table structure for table `competition_type`
--

CREATE TABLE `competition_type` (
  `comp_type_id` int(11) NOT NULL,
  `comp_type` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `competition_type`
--

INSERT INTO `competition_type` (`comp_type_id`, `comp_type`) VALUES
(1, 'Latino & Standard'),
(2, 'Social Dances'),
(3, 'Breakdance & Hip-hop');

-- --------------------------------------------------------

--
-- Table structure for table `component`
--

CREATE TABLE `component` (
  `component_id` int(11) NOT NULL,
  `component_name` varchar(50) NOT NULL,
  `component_shortname` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`component_id`, `component_name`, `component_shortname`) VALUES
(1, 'Technical Qualities', 'TQ'),
(2, 'Movement to Music', 'MM'),
(3, 'Partnering Skill', 'PS'),
(4, 'Choreography and Presentation', 'CP');

-- --------------------------------------------------------

--
-- Table structure for table `dancer`
--

CREATE TABLE `dancer` (
  `dancer_id` int(11) NOT NULL,
  `dancer_name` varchar(50) NOT NULL,
  `dancer_surname` varchar(50) NOT NULL,
  `dance_club` varchar(50) NOT NULL,
  `age_group` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dance_couple`
--

CREATE TABLE `dance_couple` (
  `dance_couple_id` int(20) NOT NULL,
  `gentleman_id` int(20) NOT NULL,
  `lady_id` int(20) NOT NULL,
  `couple_id` int(20) NOT NULL,
  `dc_dance_style` int(10) NOT NULL,
  `dc_dance_category` int(10) NOT NULL,
  `dc_age_group` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `heat`
--

CREATE TABLE `heat` (
  `heat_id` int(11) NOT NULL,
  `heat_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `heat`
--

INSERT INTO `heat` (`heat_id`, `heat_name`) VALUES
(1, 'Final'),
(2, '1/2 Semi-final'),
(3, '1/4 - Quarter-final');

-- --------------------------------------------------------

--
-- Table structure for table `last_age_group`
--

CREATE TABLE `last_age_group` (
  `last_age_group_id` int(11) NOT NULL,
  `last_age_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `last_age_group`
--

INSERT INTO `last_age_group` (`last_age_group_id`, `last_age_name`) VALUES
(1, 'Juvenile I'),
(2, 'Juvenile II'),
(3, 'Junior I'),
(4, 'Junior II'),
(5, 'Youth'),
(6, 'Under 21'),
(7, 'Adult'),
(8, 'Senior I'),
(9, 'Senior II'),
(10, 'Senior III'),
(11, 'Senior IV');

-- --------------------------------------------------------

--
-- Table structure for table `last_dance`
--

CREATE TABLE `last_dance` (
  `last_dance_id` int(11) NOT NULL,
  `last_dance_name` varchar(50) NOT NULL,
  `last_dance_shortname` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `last_dance`
--

INSERT INTO `last_dance` (`last_dance_id`, `last_dance_name`, `last_dance_shortname`) VALUES
(1, 'Cha-cha-cha', 'CCC'),
(2, 'Samba', 'SB'),
(3, 'Rumba', 'RB'),
(4, 'Paso Doble', 'PD'),
(5, 'Jive', 'JV'),
(6, 'English Waltz', 'EW'),
(7, 'Tango', 'TG'),
(8, 'Foxtrot', 'FT'),
(9, 'Viennese Waltz', 'VW'),
(10, 'Quickstep', 'QS');

-- --------------------------------------------------------

--
-- Table structure for table `last_dance_category`
--

CREATE TABLE `last_dance_category` (
  `last_dance_cat_id` int(11) NOT NULL,
  `last_dc_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `last_dance_category`
--

INSERT INTO `last_dance_category` (`last_dance_cat_id`, `last_dc_name`) VALUES
(1, 'I'),
(2, 'A'),
(3, 'B'),
(4, 'C'),
(5, 'D'),
(6, 'E'),
(7, 'F');

-- --------------------------------------------------------

--
-- Table structure for table `last_dance_style`
--

CREATE TABLE `last_dance_style` (
  `last_dance_style_id` int(11) NOT NULL,
  `last_ds_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `last_dance_style`
--

INSERT INTO `last_dance_style` (`last_dance_style_id`, `last_ds_name`) VALUES
(1, 'Standard'),
(2, 'Latin'),
(3, 'Ten dance');

-- --------------------------------------------------------

--
-- Table structure for table `ranking`
--

CREATE TABLE `ranking` (
  `ranking_id` int(20) NOT NULL,
  `couple_id` int(20) NOT NULL,
  `round_id` int(20) NOT NULL,
  `ranking_dance_style` int(20) NOT NULL,
  `ranking_dance_category` int(20) NOT NULL,
  `ranking_age_group` int(20) NOT NULL,
  `ranking_end_score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `results_id` int(10) NOT NULL,
  `couple_id` int(10) NOT NULL,
  `round_id` int(10) NOT NULL,
  `adjucator_id` int(10) NOT NULL,
  `dance_id` int(10) NOT NULL,
  `mark` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `round`
--

CREATE TABLE `round` (
  `round_id` int(10) NOT NULL,
  `competition_event` int(10) NOT NULL,
  `competition_num_round` int(10) NOT NULL,
  `competition_num_couples` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_adjucator_round`
--

CREATE TABLE `urban_adjucator_round` (
  `adj_round_id` int(5) NOT NULL,
  `competition_event` int(10) NOT NULL,
  `round_id` int(10) NOT NULL,
  `competition_adjucator_id` int(10) NOT NULL,
  `competition_adjucator_sign` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_age_group`
--

CREATE TABLE `urban_age_group` (
  `urban_age_group_id` int(5) NOT NULL,
  `urban_age_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `urban_age_group`
--

INSERT INTO `urban_age_group` (`urban_age_group_id`, `urban_age_name`) VALUES
(1, 'Kids'),
(2, 'Child'),
(3, 'Junior'),
(4, 'Youth'),
(5, 'Adult'),
(6, 'Senior');

-- --------------------------------------------------------

--
-- Table structure for table `urban_competition`
--

CREATE TABLE `urban_competition` (
  `competition_id` int(5) NOT NULL,
  `competition_date` int(10) NOT NULL,
  `competition_event` int(10) NOT NULL,
  `competition_style` int(10) NOT NULL,
  `competition_category` int(10) NOT NULL,
  `competition_age_group` int(10) NOT NULL,
  `competition_num_round` int(10) NOT NULL,
  `competition_num_teams` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_dance_category`
--

CREATE TABLE `urban_dance_category` (
  `urban_dc_id` int(5) NOT NULL,
  `urban_dc_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `urban_dance_category`
--

INSERT INTO `urban_dance_category` (`urban_dc_id`, `urban_dc_name`) VALUES
(1, 'Beginner'),
(2, 'Advanced'),
(3, 'Master');

-- --------------------------------------------------------

--
-- Table structure for table `urban_dance_style`
--

CREATE TABLE `urban_dance_style` (
  `urban_dance_style_id` int(5) NOT NULL,
  `urban_ds_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `urban_dance_style`
--

INSERT INTO `urban_dance_style` (`urban_dance_style_id`, `urban_ds_name`) VALUES
(1, 'Breakdance & Hip-hop');

-- --------------------------------------------------------

--
-- Table structure for table `urban_ranking`
--

CREATE TABLE `urban_ranking` (
  `ur_id` int(5) NOT NULL,
  `team_id` int(10) NOT NULL,
  `round_id` int(10) NOT NULL,
  `urban_dance_style` int(10) NOT NULL,
  `urban_age_group` int(10) NOT NULL,
  `urban_dance_category` int(10) NOT NULL,
  `urban_ranking_score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_result`
--

CREATE TABLE `urban_result` (
  `ur_id` int(5) NOT NULL,
  `team_id` int(10) NOT NULL,
  `round_id` int(10) NOT NULL,
  `adjucator_id` int(10) NOT NULL,
  `mark` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_round`
--

CREATE TABLE `urban_round` (
  `round_id` int(5) NOT NULL,
  `competition_event` int(10) NOT NULL,
  `competition_num_round` int(10) NOT NULL,
  `competition_num_team` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `urban_team`
--

CREATE TABLE `urban_team` (
  `id` int(5) NOT NULL,
  `team_name` varchar(50) NOT NULL,
  `team_id` int(20) NOT NULL,
  `team_style` int(20) NOT NULL,
  `team_category` int(20) NOT NULL,
  `team_studio` varchar(50) NOT NULL,
  `team_age_group` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `dance_studio` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `flag_adjucator` tinyint(1) NOT NULL,
  `flag_dance_category` tinyint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `surname`, `dance_studio`, `country`, `flag_adjucator`, `flag_dance_category`) VALUES
(1, 'admin', 'admin123', 'Administrator', '', '', '', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adjucator_round`
--
ALTER TABLE `adjucator_round`
  ADD PRIMARY KEY (`adj_round_id`);

--
-- Indexes for table `adjucator_sign`
--
ALTER TABLE `adjucator_sign`
  ADD PRIMARY KEY (`adj_sign_id`);

--
-- Indexes for table `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`competition_id`);

--
-- Indexes for table `competition_event`
--
ALTER TABLE `competition_event`
  ADD PRIMARY KEY (`comp_event_id`);

--
-- Indexes for table `competition_type`
--
ALTER TABLE `competition_type`
  ADD PRIMARY KEY (`comp_type_id`);

--
-- Indexes for table `component`
--
ALTER TABLE `component`
  ADD PRIMARY KEY (`component_id`);

--
-- Indexes for table `dancer`
--
ALTER TABLE `dancer`
  ADD PRIMARY KEY (`dancer_id`);

--
-- Indexes for table `dance_couple`
--
ALTER TABLE `dance_couple`
  ADD PRIMARY KEY (`dance_couple_id`);

--
-- Indexes for table `heat`
--
ALTER TABLE `heat`
  ADD PRIMARY KEY (`heat_id`);

--
-- Indexes for table `last_age_group`
--
ALTER TABLE `last_age_group`
  ADD PRIMARY KEY (`last_age_group_id`);

--
-- Indexes for table `last_dance`
--
ALTER TABLE `last_dance`
  ADD PRIMARY KEY (`last_dance_id`);

--
-- Indexes for table `last_dance_category`
--
ALTER TABLE `last_dance_category`
  ADD PRIMARY KEY (`last_dance_cat_id`);

--
-- Indexes for table `last_dance_style`
--
ALTER TABLE `last_dance_style`
  ADD PRIMARY KEY (`last_dance_style_id`);

--
-- Indexes for table `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`ranking_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`results_id`);

--
-- Indexes for table `round`
--
ALTER TABLE `round`
  ADD PRIMARY KEY (`round_id`);

--
-- Indexes for table `urban_adjucator_round`
--
ALTER TABLE `urban_adjucator_round`
  ADD PRIMARY KEY (`adj_round_id`);

--
-- Indexes for table `urban_age_group`
--
ALTER TABLE `urban_age_group`
  ADD PRIMARY KEY (`urban_age_group_id`);

--
-- Indexes for table `urban_competition`
--
ALTER TABLE `urban_competition`
  ADD PRIMARY KEY (`competition_id`);

--
-- Indexes for table `urban_dance_category`
--
ALTER TABLE `urban_dance_category`
  ADD PRIMARY KEY (`urban_dc_id`);

--
-- Indexes for table `urban_dance_style`
--
ALTER TABLE `urban_dance_style`
  ADD PRIMARY KEY (`urban_dance_style_id`);

--
-- Indexes for table `urban_ranking`
--
ALTER TABLE `urban_ranking`
  ADD PRIMARY KEY (`ur_id`);

--
-- Indexes for table `urban_result`
--
ALTER TABLE `urban_result`
  ADD PRIMARY KEY (`ur_id`);

--
-- Indexes for table `urban_round`
--
ALTER TABLE `urban_round`
  ADD PRIMARY KEY (`round_id`);

--
-- Indexes for table `urban_team`
--
ALTER TABLE `urban_team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adjucator_round`
--
ALTER TABLE `adjucator_round`
  MODIFY `adj_round_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `adjucator_sign`
--
ALTER TABLE `adjucator_sign`
  MODIFY `adj_sign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `competition`
--
ALTER TABLE `competition`
  MODIFY `competition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `competition_event`
--
ALTER TABLE `competition_event`
  MODIFY `comp_event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `competition_type`
--
ALTER TABLE `competition_type`
  MODIFY `comp_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `component`
--
ALTER TABLE `component`
  MODIFY `component_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dancer`
--
ALTER TABLE `dancer`
  MODIFY `dancer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `dance_couple`
--
ALTER TABLE `dance_couple`
  MODIFY `dance_couple_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `heat`
--
ALTER TABLE `heat`
  MODIFY `heat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `last_age_group`
--
ALTER TABLE `last_age_group`
  MODIFY `last_age_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `last_dance`
--
ALTER TABLE `last_dance`
  MODIFY `last_dance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `last_dance_category`
--
ALTER TABLE `last_dance_category`
  MODIFY `last_dance_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `last_dance_style`
--
ALTER TABLE `last_dance_style`
  MODIFY `last_dance_style_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ranking`
--
ALTER TABLE `ranking`
  MODIFY `ranking_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `results_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `round`
--
ALTER TABLE `round`
  MODIFY `round_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `urban_adjucator_round`
--
ALTER TABLE `urban_adjucator_round`
  MODIFY `adj_round_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `urban_age_group`
--
ALTER TABLE `urban_age_group`
  MODIFY `urban_age_group_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `urban_competition`
--
ALTER TABLE `urban_competition`
  MODIFY `competition_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `urban_dance_category`
--
ALTER TABLE `urban_dance_category`
  MODIFY `urban_dc_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `urban_dance_style`
--
ALTER TABLE `urban_dance_style`
  MODIFY `urban_dance_style_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `urban_ranking`
--
ALTER TABLE `urban_ranking`
  MODIFY `ur_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `urban_result`
--
ALTER TABLE `urban_result`
  MODIFY `ur_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `urban_round`
--
ALTER TABLE `urban_round`
  MODIFY `round_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `urban_team`
--
ALTER TABLE `urban_team`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dance_couple`
--
ALTER TABLE `dance_couple`
  ADD CONSTRAINT `dance_couple_ibfk_1` FOREIGN KEY (`dance_couple_id`) REFERENCES `dancer` (`dancer_id`);

--
-- Constraints for table `heat`
--
ALTER TABLE `heat`
  ADD CONSTRAINT `heat_ibfk_1` FOREIGN KEY (`heat_id`) REFERENCES `adjucator_round` (`adj_round_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
