-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 07:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations-site`
--
CREATE DATABASE IF NOT EXISTS `vacations-site` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations-site`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 1),
(2, 3),
(2, 4),
(2, 11),
(2, 13),
(2, 14),
(2, 15),
(2, 18),
(6, 1),
(6, 4),
(6, 8),
(6, 13),
(7, 1),
(7, 3),
(7, 4),
(7, 11),
(7, 13),
(7, 14),
(7, 15),
(7, 16),
(7, 17),
(8, 1),
(8, 3),
(8, 4),
(8, 8),
(8, 12),
(8, 13),
(8, 15),
(8, 17),
(8, 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Oran', 'Shakarof', 'OranShakarof@gmail.com', 'a54725ebebf985babd354f04a4f1bf657fd5a8765deb008896bddd760606e0c3d54807f19126370efdbd86dd8456c9ef5cac80a4ab4151c41afff4c548a2af4f', 2),
(2, 'Bart', 'Simpson', 'BartSimpson@gmail.com', 'a54725ebebf985babd354f04a4f1bf657fd5a8765deb008896bddd760606e0c3d54807f19126370efdbd86dd8456c9ef5cac80a4ab4151c41afff4c548a2af4f', 1),
(6, 'Moishe', 'Ufnik', 'MoisheUfnikHashed@gmail.com', 'a54725ebebf985babd354f04a4f1bf657fd5a8765deb008896bddd760606e0c3d54807f19126370efdbd86dd8456c9ef5cac80a4ab4151c41afff4c548a2af4f', 1),
(7, 'Oran', 'Shakarof', 'OranShakarov@gmail.com', 'a54725ebebf985babd354f04a4f1bf657fd5a8765deb008896bddd760606e0c3d54807f19126370efdbd86dd8456c9ef5cac80a4ab4151c41afff4c548a2af4f', 1),
(8, 'Avi', 'Ron', 'AviRon@Gmail.com', 'a54725ebebf985babd354f04a4f1bf657fd5a8765deb008896bddd760606e0c3d54807f19126370efdbd86dd8456c9ef5cac80a4ab4151c41afff4c548a2af4f', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `image`) VALUES
(1, 'Rome', 'Experience the timeless allure of Rome with our vacation site as your guide. Roam the ancient streets, where history comes to life through iconic landmarks like the Colosseum and Vatican City. Delight in exquisite Italian cuisine at charming eateries and sip espresso at quaint cafes. Immerse yourself in art and culture, from Michelangelo\'s Sistine Chapel to the treasures of the Borghese Gallery. Explore the city\'s vibrant neighborhoods, blending history with modernity. Whether you\'re a history buff, a foodie, or a seeker of romance, Rome promises an unforgettable journey. Pack your bags and let the Eternal City enchant you, creating cherished memories to last a lifetime.', '2023-09-16', '2023-09-20', 750.00, 'a5731b9d-3cbb-41c6-ac13-40f25c2fbd03.webp'),
(3, 'Thailand', 'Welcome to Thailand, where enchanting smiles and diverse experiences await. Our vacation site is your portal to this vibrant land of pristine beaches, tantalizing street food, ancient temples, and lush jungles. Whether you\'re seeking relaxation by the sea, cultural exploration at historic sites, or thrilling adventures in nature, Thailand offers it all. Pack your bags and embrace the warmth and wonders of this remarkable country, where each day promises unforgettable moments. Thailand, the Land of Smiles, invites you to create lasting memories!\r\n\r\n\r\n\r\n\r\n', '2023-11-04', '2023-11-19', 5764.00, 'c1e353fa-4891-497a-94b2-5bdf4c15cc9b.jpg'),
(4, 'New York', 'Welcome to New York, the city that never sleeps, where every moment pulses with ambition and culture. Our vacation site is your key to the Big Apple\'s iconic experiences, from the Statue of Liberty\'s majestic presence to the serenity of Central Park and the rich offerings of world-class museums. Savor diverse culinary delights, from street-side hot dogs to gourmet dining in Manhattan\'s chic restaurants. New York is a city of towering skyscrapers, Broadway\'s dazzling shows, and bustling neighborhoods, and our site ensures your visit is effortless. Pack your bags and dive into the boundless energy and allure of New York City, where every day promises new adventures and unforgettable memories. New York, the City That Never Sleeps, invites you to craft your own urban tale!', '2023-11-03', '2023-11-18', 7845.00, '5f99c571-dd69-4b92-95ab-b54fdc0a6902.jpg'),
(8, 'Greece', 'Embark on a journey to Greece with our travel guide. Roam through ancient wonders like the Acropolis and Delphi, savor Mediterranean cuisine at charming tavernas, and immerse yourself in the arts and culture of Greece. Experience the harmonious coexistence of history and modernity in its cities and islands. Whether you\'re a history buff, a food lover, or simply seeking breathtaking landscapes, Greece promises an unforgettable adventure. Pack your bags and let the cradle of Western civilization enchant you, creating cherished memories to last a lifetime', '2023-10-23', '2023-10-28', 345.00, '9f32e5a2-79b9-4cc2-8531-87ce8d084ab2.jpg'),
(11, 'India', 'Discover the captivating essence of India with our travel guide. Explore ancient wonders like the Taj Mahal and Varanasi\'s ghats, savor diverse cuisine at street food stalls, and immerse yourself in vibrant arts and culture. Experience the seamless blend of tradition and modernity in India\'s cities and countryside. Whether you\'re a history enthusiast, a culinary explorer, or seeking spirituality, India offers an unforgettable journey. Pack your bags and let this land of diversity and spirituality enchant you, creating lasting memories.', '2023-10-13', '2023-10-20', 1234.00, '1f7144e9-a24b-49db-b35a-56d8611779e7.jpg'),
(12, 'Las Vegas', 'Experience the electrifying allure of Las Vegas with our travel guide. Explore the dazzling world of entertainment, from iconic casinos and world-class shows to vibrant nightlife. Savor gourmet dining at renowned restaurants and try your luck at the gaming tables. Immerse yourself in the city\'s vibrant atmosphere, where luxury and excitement collide. Whether you\'re a thrill-seeker, a food enthusiast, or a lover of entertainment, Las Vegas promises an unforgettable escape. Pack your bags and let the Entertainment Capital of the World captivate you, creating memorable moments to cherish.', '2024-07-13', '2024-07-27', 8999.00, '999f04a6-9876-47a3-b447-045306549965.jpg'),
(13, 'Paris', 'Bienvenue à Paris, the city of love and lights, where every street exudes romance and charm. Our vacation site is your passport to a dreamy Parisian getaway. Explore iconic landmarks like the Eiffel Tower and Louvre Museum, savor exquisite French cuisine, and stroll through Montmartre\'s artistic streets. Paris is a city of endless possibilities, and our site ensures your experience is enchanting. Pack your bags and fall in love with the magic of Paris, where every moment is a memory waiting to be made. Paris, the City of Love, is calling you!', '2023-10-12', '2023-10-15', 743.00, 'f853ac04-ff54-47a0-bdf0-9f27a9de55f6.jpg'),
(14, 'Barcelona', 'Barcelona, a vibrant and cosmopolitan city nestled along the northeastern coast of the Iberian Peninsula, beckons travelers with its unique blend of rich history, stunning architecture, and lively culture. As the capital of Catalonia, Barcelona boasts iconic landmarks, including the awe-inspiring Sagrada Família and the architectural wonders designed by Antoni Gaudí. The city\'s charming Gothic Quarter invites exploration through narrow medieval streets, while its picturesque beaches offer a sun-soaked escape. Visitors can savor delectable Catalan cuisine at bustling markets and tapas bars, immersing themselves in the local gastronomic delights. With a lively arts scene, world-class museums, and a dynamic nightlife, Barcelona stands as a captivating destination where the past seamlessly intertwines with the present, promising an unforgettable vacation experience.', '2023-11-16', '2023-11-19', 459.00, '73d7b53d-c0cc-4203-883c-ea6fae492311.avif'),
(15, 'Zanzibar', 'Zanzibar, an idyllic tropical haven off Africa\'s eastern coast, invites exploration of its pristine beaches, vibrant coral reefs, and cultural treasures. This archipelago in the Indian Ocean offers white-sand beaches, turquoise waters, and a rich history reflected in Stone Town\'s UNESCO-listed architecture. Spice tours unveil the aromatic heritage, while bustling markets showcase local crafts and exotic spices. The crystal-clear waters attract snorkeling and diving enthusiasts to discover marine wonders. With its laid-back charm, cultural diversity, and scenic landscapes, Zanzibar promises a captivating and rejuvenating vacation.', '2023-11-26', '2023-12-10', 3999.00, '13f46d43-ed19-4104-a12b-fb8d4162336c.jpg'),
(16, 'Dubai', 'Dubai, a dynamic metropolis in the heart of the Arabian Desert, beckons travelers with its opulent blend of modern marvels and rich cultural experiences. This vibrant city showcases iconic skyscrapers, including the Burj Khalifa, the world\'s tallest building, and the sail-shaped Burj Al Arab. Dubai\'s extravagant shopping malls, bustling souks, and luxurious resorts define it as a global shopping and entertainment hub. Visitors can explore the historic Al Fahidi District with its wind-tower architecture and vibrant art scene or venture into the mesmerizing desert for a taste of traditional Bedouin hospitality. With its futuristic architecture, desert adventures, and a multicultural atmosphere, Dubai promises an exhilarating and diverse vacation experience.', '2023-12-17', '2023-12-21', 1255.00, '36784149-57d2-4003-855c-35e1240ba122.jpg'),
(17, 'Switzerland (winter)  ', 'Switzerland, a winter wonderland nestled in the heart of Europe, invites visitors to immerse themselves in a magical snowy landscape. Blanketed in pristine snow, the iconic alpine peaks and charming villages transform into a picturesque scene straight from a fairytale. The Swiss winter experience offers thrilling outdoor activities, from world-class skiing in the Swiss Alps to enchanting snowshoe walks in serene forests. The cozy ambiance of Swiss chalets, the warmth of indulgent hot chocolate, and the glow of festive lights create a charming winter atmosphere. With its renowned ski resorts, festive markets, and breathtaking snowy panoramas, Switzerland in winter promises an enchanting and unforgettable vacation for those seeking the magic of the season.', '2023-12-24', '2023-12-29', 895.00, 'bc20a5a0-e585-4001-bd7e-da2ffcdb520b.jpeg'),
(18, 'Miami', 'Miami, a vibrant city on the southeastern tip of the United States, lures visitors with its sun-soaked beaches, eclectic neighborhoods, and lively cultural scene. Known for its glamorous Art Deco architecture in South Beach and the pulsating energy of Little Havana, Miami offers a unique fusion of diverse influences. The city\'s tropical climate sets the stage for outdoor adventures, from relaxing on the sandy shores of Miami Beach to exploring the lush landscapes of the Everglades. A melting pot of art, music, and cuisine, Miami thrives on its vibrant nightlife, world-class galleries, and a culinary scene that reflects its multicultural flair. With its iconic skyline, vibrant street art, and an endless array of entertainment options, Miami promises a dynamic and exhilarating vacation experience for those seeking sun, culture, and an unforgettable urban escape.', '2024-06-30', '2024-07-21', 8225.00, '6047e478-1aca-4e82-90a7-14af5d591d2d.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
