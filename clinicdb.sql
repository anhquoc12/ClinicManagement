-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: clinic_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nurse_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `specialization_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `appointment_status` enum('WAITTING','CONFIRMED','CANCLED','PRESENT','FINISHED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointment_ibfk_1` (`nurse_id`),
  KEY `appointment_ibfk_2` (`patient_id`),
  KEY `appointment_ibfk_3` (`specialization_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (3,29,16,'2023-08-06 18:03:42','2023-09-05 00:00:00',5,'asAS','FINISHED'),(8,29,16,'2023-08-06 23:13:30','2023-09-05 00:00:00',4,'11223','FINISHED'),(50,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(51,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(52,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(53,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(54,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(55,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(56,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(57,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(58,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(59,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(60,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(61,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(62,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(63,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(64,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(65,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(66,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(67,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(68,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(69,NULL,16,'2023-08-07 01:39:19','2023-08-10 00:00:00',1,'32323123adasda','CANCLED'),(70,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(71,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(72,29,16,'2023-08-07 01:39:19','2023-09-05 00:00:00',1,'32323123adasda','FINISHED'),(73,29,16,'2023-08-07 01:39:19','2023-09-06 00:00:00',1,'32323123adasda','FINISHED'),(74,29,16,'2023-08-07 01:39:19','2023-09-06 00:00:00',1,'32323123adasda','FINISHED'),(75,29,16,'2023-08-07 01:39:19','2023-09-06 00:00:00',1,'32323123adasda','FINISHED'),(76,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(77,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(78,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(79,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(80,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(81,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(82,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(83,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(84,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(85,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(86,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(87,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(88,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(89,29,16,'2023-08-07 01:39:20','2023-09-06 00:00:00',1,'32323123adasda','PRESENT'),(133,29,88,'2023-08-27 23:35:02','2023-09-05 00:00:00',5,'test description','FINISHED'),(134,29,16,'2023-09-03 21:36:24','2023-09-06 00:00:00',7,'test react','PRESENT'),(135,29,16,'2023-09-03 21:37:25','2023-09-06 00:00:00',4,'test react','PRESENT'),(136,29,16,'2023-09-03 21:38:10','2023-09-06 00:00:00',4,'test react','PRESENT'),(137,29,16,'2023-09-03 22:30:45','2023-09-06 00:00:00',5,'dajdjasdjasdasd','PRESENT'),(138,29,16,'2023-09-04 00:30:17','2023-09-06 00:00:00',4,'dfsdasd','PRESENT'),(139,29,16,'2023-09-04 00:31:21','2023-09-06 00:00:00',3,'sdadasa','PRESENT'),(140,29,16,'2023-09-04 00:40:14','2023-09-06 00:00:00',5,'edfsdfsd','PRESENT'),(141,29,16,'2023-09-04 01:37:01','2023-09-06 00:00:00',6,'test','PRESENT'),(142,29,16,'2023-09-04 01:47:52','2023-09-06 00:00:00',4,'dwawqeqw','PRESENT'),(143,29,16,'2023-09-04 01:49:53','2023-09-06 00:00:00',6,'eweqewqe','PRESENT'),(144,29,16,'2023-09-04 01:58:40','2023-09-06 00:00:00',3,'ewrewrw','PRESENT'),(145,29,16,'2023-09-05 00:03:29','2023-09-06 00:00:00',4,'gfgdgdgddgdgdgd','PRESENT'),(146,29,16,'2023-09-05 00:56:00','2023-09-06 00:00:00',5,'sdasdasd','PRESENT'),(147,29,16,'2023-09-05 00:56:09','2023-09-06 00:00:00',5,'vdxfsfsf','PRESENT'),(148,NULL,16,'2023-09-07 16:39:20','2023-09-21 00:00:00',5,'ewdawd','CANCLED');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (7,'Chăm Sóc Da'),(8,'Chăm Sóc Mắt'),(10,'Chăm Sóc Răng Miệng'),(13,'Chăm Sóc Trẻ Em'),(4,'Dị Ứng & Viêm Mũi'),(19,'Dừng Hút Thuốc'),(17,'Dược Thảo & Phương Pháp Tự Nhiên'),(9,'Hộ Trợ Sơ Cứu'),(5,'Ho, Cảm & Cúm'),(16,'Quản Lý Cân Nặng'),(14,'Quản Lý Đái Tháo Đường'),(12,'Sức Khỏe Nam Giới'),(11,'Sức Khỏe Phụ Nữ'),(20,'Sức Khỏe Thú Cưng'),(6,'Sức Khỏe Tiêu Hóa'),(15,'Sức Khỏe Tim Mạch'),(1,'Thuốc'),(3,'Thuốc Giảm Đau'),(18,'Thuốc Giúp Ngủ'),(2,'Vitamin & Bổ Sung');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `specialization_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_ibfk_1` (`user_id`),
  KEY `doctor_ibfk_2` (`specialization_id`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,9,5),(2,10,3),(6,26,5),(12,99,7);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `payment_status` enum('PENDING','ACCEPTED') DEFAULT NULL,
  `nurse_id` int DEFAULT NULL,
  `medical_record_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_ibfk_1` (`medical_record_id`),
  KEY `invoice_ibfk_2` (`nurse_id`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_record` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`nurse_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (17,'2023-08-13 03:18:17','ACCEPTED',29,32),(18,'2023-08-13 03:20:26','PENDING',NULL,33),(19,'2023-08-13 03:22:28','PENDING',NULL,34),(20,'2023-08-13 03:25:03','PENDING',NULL,35),(21,'2023-08-13 03:27:12','ACCEPTED',29,36),(22,'2023-08-13 03:43:55','PENDING',NULL,37),(23,'2023-08-13 03:47:09','PENDING',NULL,38),(24,'2023-08-13 03:49:56','PENDING',NULL,39),(25,'2023-08-13 03:52:01','PENDING',NULL,40),(27,'2023-08-13 13:30:17','PENDING',NULL,42),(36,'2023-08-13 14:48:11','PENDING',NULL,51),(37,'2023-08-13 14:51:48','ACCEPTED',29,52),(38,'2023-08-13 19:13:34','PENDING',NULL,53),(39,'2023-08-14 17:24:39','PENDING',NULL,54),(40,'2023-08-14 19:07:16','ACCEPTED',29,55),(42,'2023-08-14 19:57:30','PENDING',NULL,57),(43,'2023-08-14 21:31:11','PENDING',NULL,58),(44,'2023-08-14 21:50:54','PENDING',NULL,59),(45,'2023-08-14 21:58:40','PENDING',NULL,60),(46,'2023-08-14 22:23:03','PENDING',NULL,61),(47,'2023-08-14 22:33:41','ACCEPTED',29,62),(50,'2023-08-14 23:09:12','PENDING',NULL,65),(52,'2023-08-14 23:42:45','PENDING',NULL,67),(55,'2023-09-05 00:25:36','PENDING',NULL,70),(56,'2023-09-05 01:06:58','PENDING',NULL,71),(57,'2023-09-05 01:07:08','PENDING',NULL,72),(58,'2023-09-05 01:07:17','PENDING',NULL,73),(59,'2023-09-05 01:08:17','PENDING',NULL,74),(60,'2023-09-05 01:10:29','PENDING',NULL,75),(61,'2023-09-05 01:14:05','PENDING',NULL,76),(62,'2023-09-05 01:14:35','PENDING',NULL,77),(63,'2023-09-05 01:15:38','PENDING',NULL,78),(64,'2023-09-05 01:16:33','PENDING',NULL,79),(65,'2023-09-05 01:19:29','PENDING',NULL,80),(66,'2023-09-05 01:20:19','PENDING',NULL,81),(67,'2023-09-06 19:42:37','PENDING',NULL,82),(68,'2023-09-06 19:48:16','ACCEPTED',29,83),(69,'2023-09-06 20:15:13','PENDING',NULL,84);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_record`
--

DROP TABLE IF EXISTS `medical_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `symptom` text,
  `conclusion` text,
  `advice` text,
  `examination_fee` decimal(10,2) DEFAULT NULL,
  `note` text,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `medical_record_ibfk_2` (`doctor_id`),
  CONSTRAINT `medical_record_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `user` (`id`),
  CONSTRAINT `medical_record_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_record`
--

LOCK TABLES `medical_record` WRITE;
/*!40000 ALTER TABLE `medical_record` DISABLE KEYS */;
INSERT INTO `medical_record` VALUES (32,16,54,'dasdass','saasds',NULL,45000.00,'','2023-08-13 03:18:17'),(33,16,54,'SADSA','SASA',NULL,45000.00,'DSADADSA','2023-08-13 03:20:26'),(34,16,54,'fdsfs','sdsd',NULL,43000.00,'','2023-08-13 03:22:28'),(35,16,54,'d','ds',NULL,45000.00,'ddsfdsds','2023-08-13 03:25:03'),(36,16,54,'dsasdsa','ssas',NULL,50000.00,'dsfsdd','2023-08-13 03:27:12'),(37,16,54,'sasada','sasasd',NULL,45000.00,'','2023-08-13 03:43:55'),(38,16,54,'sadsad','sasa',NULL,45000.00,'','2023-08-13 03:47:09'),(39,16,54,'erwe','rewe',NULL,45000.00,'','2023-08-13 03:49:56'),(40,16,54,'dsd','sdsfds',NULL,45000.00,'','2023-08-13 03:52:01'),(42,16,54,'dsada','dadsa',NULL,55000.00,'fdssf','2023-08-13 13:30:17'),(43,16,54,'dfsfds','dsds',NULL,45000.00,'fdsfsfs','2023-08-13 13:31:54'),(51,16,54,'test','test',NULL,50000.00,'','2023-08-13 14:48:10'),(52,16,54,'zZ','xzzxz',NULL,45000.00,'','2023-08-13 14:51:48'),(53,16,54,'zxX','ZxzzX',NULL,45000.00,'','2023-08-13 19:13:34'),(54,16,54,'dffd','dfsd',NULL,50000.00,'dsasdasdasdsa','2023-08-14 17:24:39'),(55,16,54,'đau bụng, nôn, tay chân mệt mỏi','sốt rét',NULL,45000.00,'','2023-08-14 19:07:16'),(56,16,54,'xzcxz','xczxzx','xzcxz',45000.00,'','2023-08-14 19:49:00'),(57,16,54,'Đau đầu, đau họng, sổ mũi, nóng trong người','bị sốt nhẹ','nên nằm nghỉ ở nhà',34000.00,'','2023-08-14 19:57:30'),(58,16,54,'vc','vc','vc',45000.00,'','2023-08-14 21:31:11'),(59,16,54,'bị đau bụng','viêm dạ dạy','không ăn uống đồ lạnh',20000.00,'','2023-08-14 21:50:54'),(60,16,54,'bị đau bụng','viêm dạ dạy','nằm nghỉ',35000.00,'','2023-08-14 21:58:40'),(61,16,54,'test','test','test2',45000.00,'','2023-08-14 22:23:03'),(62,16,54,'xczx','zczxc','zxzz',45000.00,'','2023-08-14 22:33:41'),(63,16,54,'xczxczx','zxczx','xzcxz',56000.00,'','2023-08-14 22:37:25'),(64,16,54,'bị đau bung, buồn nôn, nhức đầu','viêm dạ dạy','không ăn đồ ăn lạnh',50000.00,'','2023-08-14 22:45:33'),(65,16,54,'test','test','test',34000.00,'','2023-08-14 23:09:12'),(66,16,54,'bị đau bụng','đau dạ dày','uống nước ấm',34000.00,'','2023-07-14 23:12:13'),(67,16,54,'bị đau bụng','viêm dạ dày','không ăn đồ lạnh',21000.00,'','2023-08-14 23:42:45'),(68,16,54,'test nhanh','test h','ashdsas',56000.00,'','2023-08-14 23:57:15'),(69,16,54,'Đau đầu, đau họng, rát họng, ho, nóng trong người','sốt cao','uống nhiều vitamin C',40000.00,'','2023-08-16 00:28:35'),(70,16,54,'gdgfdf','rerett','ertertt',20000.00,'fsfsdfds','2023-09-05 00:25:36'),(71,16,54,'da','anbc123','anbc123',50000.00,'','2023-09-05 01:06:58'),(72,16,54,'da','anbc123','anbc123',50000.00,'','2023-09-05 01:07:08'),(73,16,54,'da','anbc123','anbc123',50000.00,'fsfs','2023-09-05 01:07:17'),(74,16,54,'dsadas','dasdsa','anhquoc0304',50000.00,'fsdsadas','2023-09-05 01:08:17'),(75,16,54,'nurses','Hồ Văn Tâm','anhquoc0304',50000.00,'Hồ Văn Tâm','2023-09-05 01:10:29'),(76,16,54,'Hồ Văn Tâm','Hồ Văn Tâm','anhquoc0304',50000.00,'d','2023-09-05 01:14:04'),(77,16,54,'anbc123','anbc123','anhquoc0304',23000.00,'ddsads','2023-09-05 01:14:35'),(78,88,54,'dasdas','dsd','dsadasd',32000.00,'','2023-09-05 01:15:38'),(79,16,54,'sfdsdfdsf','nurses','fsf',45000.00,'','2023-09-05 01:16:33'),(80,16,54,'Hồ Văn Tâm','admin','anbc123',50000.00,'','2023-09-05 01:19:28'),(81,16,54,'nurses','anbc123','nurses',79999.00,'anbc123','2023-09-05 01:20:19'),(82,16,54,'Ho , sốt, đau đầu','Bị cảm','Nghỉ ngơi ở nhà',34000.00,'','2023-09-06 19:42:37'),(83,16,54,'sds','sadsas','sdsad',44999.00,'','2023-09-06 19:48:16'),(84,16,54,'sda','dasd','dsd',50000.00,'','2023-09-06 20:15:13');
/*!40000 ALTER TABLE `medical_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `unit_in_stock` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `unit_medicine_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `medicine_ibfk_1` (`category_id`),
  KEY `medicine_ibfk_2` (`unit_medicine_id`),
  CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medicine_ibfk_2` FOREIGN KEY (`unit_medicine_id`) REFERENCES `unit_medicine` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES (22,'Vitamin C',12000.00,230,2,42),(23,'Paracetamol',17940.00,11,3,1),(24,'Claritin',28290.00,1,4,1),(25,'Coldrex',20470.00,53,5,2),(26,'Imodium',23000.00,1,6,2),(27,'Nivea Cream',3500.00,95,20,3),(29,'Band-Aid',2000.00,194,9,2),(30,'Colgate Toothpaste',4200.00,150,10,3),(31,'Iron Supplement',9600.00,64,11,1),(32,'Multivitamin',11800.00,42,2,1),(33,'Baby Lotion',7000.00,100,18,36),(34,'Insulin',25500.00,20,14,3),(35,'Aspirin',6500.00,10,3,1),(36,'Omega-3 Fish Oil',13000.00,40,15,1),(37,'Green Tea Extract',8000.00,60,16,1),(38,'Melatonin',9200.00,30,18,1),(39,'Nicotine Patches',15000.00,25,2,3),(40,'Pet Antibiotics',11500.00,40,20,3),(41,'Vitamin B12',142600.00,52,2,1),(42,'Ibuprofen',218500.00,70,3,1),(43,'Zyrtec',269100.00,40,4,1),(44,'Theraflu',179400.00,32,5,2),(45,'Pepto-Bismol',135700.00,74,6,3),(46,'Eucerin Lotion',103500.00,110,7,3),(47,'Eye Ointment',188600.00,80,8,3),(48,'Adhesive Bandages',34500.00,250,9,2),(49,'Oral-B Toothpaste',110400.00,180,10,3),(50,'Calcium Supplement',193200.00,65,11,1),(51,'Fish Oil Capsules',248400.00,50,15,1),(52,'Lavender Oil',138000.00,70,16,1),(53,'Valerian Root',172500.00,40,18,1),(54,'Nicotine Gum',287500.00,35,19,1),(55,'Pet Vitamins',21850.00,45,2,1),(56,'Antacid Tablets',115000.00,70,6,1),(57,'Insulin Pen',655500.00,18,14,1),(58,'Panadol Extra',149500.00,70,3,1),(59,'Vitamin D',96600.00,51,2,1),(61,'Naproxen',204700.00,29,3,1),(63,'Cetirizine',207000.00,45,4,1),(64,'Vicks Vaporub',172500.00,40,5,3),(65,'Immunoglobulin',2760000.00,10,14,3),(69,'Melatonin Gummies',253000.00,16,18,2),(70,'Nicotine Lozenges',299000.00,30,19,2),(98,'Vitamin D12 B9',30000.00,50,8,12);
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `medicine_id` int DEFAULT NULL,
  `medical_record_id` int DEFAULT NULL,
  `dosage` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `frequency` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `duration` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `total_unit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_ibfk_1` (`medicine_id`),
  KEY `prescription_ibfk_2` (`medical_record_id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_record` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (27,22,32,'sdsaas','sasas','adssds',1),(28,23,32,'dsasda','sasd','addsasda',1),(29,24,32,'dsdas','dasasd','dss',1),(30,22,33,'DSA','DAAAS','DASSA',1),(31,23,33,'DASSASA','SAASSA','SAAS',1),(32,22,34,'d','d','d',1),(33,23,34,'d','d','dd',1),(34,24,34,'d','d','d',1),(35,22,35,'c','d','s',1),(36,27,35,'fsd','d','sd',1),(37,25,35,'sadas','sa','dssa',1),(38,24,36,'sdfsd','sdsds','dssdsd',1),(39,25,36,'dssddf','ssds','dsdsd',1),(40,26,36,'dsfsd','fdsds','dfssd',1),(41,22,37,'dsd','sda','s',10),(42,23,37,'sadsa','sasa','saa',20),(43,24,37,'sadsa','sads','asas',9),(44,22,38,'sas','sdsa','sdsad',10),(46,22,39,'fdg','fdfd','fg',10),(47,23,39,'f','f','f',20),(48,24,39,'f','f','f',9),(49,22,40,'d','sas','a',10),(50,23,40,'asa','asd','dsadsa',9),(51,24,40,'sda','sdas','sdsa',9),(52,22,42,'sddasdsa','dasdsa','sasa',5),(53,23,42,'sasad','asdsa','saas',5),(54,24,42,'ssads','assaa','sdsa',5),(57,24,43,'d','dd','d',9),(58,24,43,'fdg','ddfgd','fddf',9),(59,24,43,'fd','sdfsds','sdfds',9),(60,27,51,'test','test',NULL,20),(61,22,52,'sad','adsds',NULL,5),(62,26,53,'c','d',NULL,1),(63,22,55,'1 viên / lần','2 lần / ngày',NULL,4),(64,61,55,'1 viên / lần','2 lần / ngày',NULL,6),(65,42,55,'1 viên / lần','2 lần / ngày',NULL,6),(66,26,55,'1 gói / lần','3 lần /ngày',NULL,6),(67,25,55,'1 gói / lần','2 lần / ngày (Sáng, tối)',NULL,4),(69,26,56,'c','c',NULL,1),(70,26,56,'s','sa',NULL,1),(71,26,56,'z','x',NULL,1),(72,22,57,'1 viên / ngày','3 lần / ngày',NULL,9),(73,23,57,'1 viên / ngày','3 lần / ngày',NULL,9),(74,61,57,'1 viên / ngày','3 lần / ngày',NULL,9),(75,27,57,'xz','zxZ',NULL,1),(76,22,58,'d','d',NULL,1),(77,23,58,'d','dd',NULL,1),(78,24,58,'d','d',NULL,1),(79,22,58,'d','d',NULL,1),(80,23,58,'d','dd',NULL,1),(81,24,58,'d','d',NULL,1),(82,22,58,'d','d',NULL,1),(83,23,58,'d','dd',NULL,1),(84,24,58,'d','d',NULL,1),(85,25,58,'dsdfs','dssd',NULL,1),(86,26,58,'dsf','sdds',NULL,1),(87,24,58,'sdfdf','dfsds',NULL,1),(88,26,59,'1 gói / lần','2 lần / ngày (Sáng, tối)',NULL,14),(94,56,60,'1 viên / lần','3 lần / ngày',NULL,9),(95,45,60,'500ml / lần','1 lần / ngày',NULL,1),(96,27,60,'czx','xzczc',NULL,1),(97,27,60,'f','ff',NULL,1),(103,22,62,'dfs','dffsf',NULL,1),(104,23,62,'sdsf','dsfssf',NULL,1),(107,27,63,'xc','xxz',NULL,1),(109,35,64,'1 viên / lần','3 lần / ngày',NULL,1),(113,56,66,'1 viên / lần','2 lần / ngày (Sáng, tối)\n',NULL,6),(115,26,66,'1 viên / lần','2 lần / ngày (Sáng, tối)',NULL,6),(116,61,66,'1 viên / lần','2 lần / ngày (Sáng, tối)',NULL,6),(117,35,66,'2 viên / lần','3 lần / ngày ',NULL,18),(118,41,66,'2 viên / lần','3 lần / ngày ',NULL,18),(119,32,66,'2 viên / lần','3 lần / ngày ',NULL,18),(120,59,66,'1 viên / lần','3 lần / ngày ',NULL,9),(122,44,66,'1 viên / lần','3 lần / ngày ',NULL,9),(123,69,66,'1 viên / lần','3 lần / ngày ',NULL,9),(124,25,68,'d','dd','d2',1),(125,22,69,'1 viên / lần','1 lần / ngày','1 ngày',1),(127,44,69,'1 gói / lần','2 lần / ngày (Sáng, tối)','7 ngày',14),(128,23,69,'1 gói / lần','3 lần / ngày','7 ngày',21),(129,35,69,'1 viên / lần','3 lần / ngày','7 ngày',21),(130,42,69,'1 viên / lần','2 lần / ngày (Sáng, tối)','7 ngày',14),(131,25,82,'1','1','1',1),(132,26,82,'1','1','1',1),(133,27,82,'1','1','1',1),(134,29,83,'f','f','f',1),(135,31,83,'f','f','f',1),(136,26,83,'f','f','f',1),(137,29,83,'f','f','f',1),(138,31,83,'f','f','f',1),(139,26,83,'f','f','f',1),(140,29,83,'f','f','f',1),(141,31,83,'f','f','f',1),(142,26,83,'f','f','f',1),(143,29,83,'f','f','f',1),(144,31,83,'f','f','f',1),(145,26,83,'f','f','f',1),(146,29,83,'f','f','f',1),(147,31,83,'f','f','f',1),(148,26,83,'f','f','f',1),(149,29,83,'f','f','f',1),(150,31,83,'f','f','f',1),(151,26,83,'f','f','f',1);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Phòng 101'),(2,'Phòng 102'),(3,'Phòng 103'),(4,'Phòng 201'),(5,'Phòng 202'),(6,'Phòng 203'),(26,'Phòng 97'),(7,'Phòng A1'),(8,'Phòng A2'),(9,'Phòng B1'),(10,'Phòng B2');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `schedule_date` date DEFAULT NULL,
  `shift_start` time DEFAULT NULL,
  `shift_end` time DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_ibfk_1` (`room_id`),
  KEY `schedule_ibfk_2` (`user_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=540 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (4,12,'2023-09-06','19:43:00','19:44:00',9),(517,12,'2023-09-08','18:00:00','21:00:00',8),(518,12,'2023-09-08','19:00:00','21:02:00',9),(519,12,'2023-09-07','20:04:00','20:04:00',10),(520,9,'2023-09-07','20:09:00','20:04:00',1),(522,9,'2023-08-30','23:46:00','23:47:00',1),(529,9,'2023-09-07',NULL,NULL,1),(530,13,'2023-07-31','23:07:00','21:05:00',1),(532,37,'2023-08-31','03:00:00','15:00:00',6),(533,9,'2023-08-17','19:09:00','19:09:00',1),(534,9,'2023-09-09','20:26:00','22:25:00',1),(535,10,'2023-08-26','07:00:00','11:00:00',3),(536,10,'2023-08-26','07:00:00','15:00:00',3);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` VALUES (2,'Da liễu'),(7,'Nhi khoa'),(3,'Nội tiết'),(8,'Tâm thần'),(5,'Thần kinh'),(4,'Tiêu hóa'),(1,'Tim mạch'),(6,'Ung thư');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_medicine`
--

DROP TABLE IF EXISTS `unit_medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_medicine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_medicine`
--

LOCK TABLES `unit_medicine` WRITE;
/*!40000 ALTER TABLE `unit_medicine` DISABLE KEYS */;
INSERT INTO `unit_medicine` VALUES (40,'báº£o'),(38,'bá»¹'),(3,'chai'),(2,'gói'),(4,'há»§'),(74,'test postman unit'),(79,'test1232dddd'),(42,'thuá»c 2'),(11,'thuá»c 41'),(12,'thuá»c 672'),(36,'Vá»¹a'),(37,'vÃ½'),(27,'vcx2'),(1,'Viên');
/*!40000 ALTER TABLE `unit_medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_role` enum('ADMIN','DOCTOR','NURSE','PATIENT') DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `full_name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (8,'admin','$2a$10$nB.bsgnUbYF2UWq6Po0BiulVSRZ7c9ePU2P9A2.MuUE2wwJlo9Rom','ADMIN','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691080126/lrh4log4j28q3lgl5oxf.jpg','Nguyễn Anh QUốc','Hồ CHí Minh','abc@gmail.com','012535667777'),(9,'doctor143','$2a$10$w0b2f1VmCG5pYI7125YNqejEhpl3JobgfDn0olQg.LFwaPDunX4pW','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694079149/vhtscedxbweboq5e1ngh.jpg','test54','HCM','test@gmail.com','04923832'),(10,'doctor32','$2a$10$wUqTlqLgPUHlQGrjpTY9Su6g5zG5yAxxmNpLuR923eeVl2a6w759O','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1693418783/thpdifrpfnfby2yunrew.jpg','test12','test','abc@gmail.com','123455'),(12,'nurseapi123up','$2a$10$iUKHmtHz51iIzjAacKk/4erVMBqbcdd2yDpeHT2FvH68yQ2pz00me','NURSE','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694079230/yli0gdfqtzcaohuxui1m.jpg','test12','HCM','test@gmail.com','04923832'),(13,'nurse2','$2a$10$OqPTo0iuaqE/CgP8Ypxbv.BCYoLg.8bI1FtG/aOX.NfHy6VxE4DfW','NURSE','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694239733/jippckejdwya44zjyhqm.jpg','test','test','abc@gmail.com','123455'),(14,'nurse3s2','$2a$10$wyNnjQIE0vCTGn4X2j7F7u5Qy/mgeQHVYvZdhJO5OS64TJId5OaoG','NURSE','https://res.cloudinary.com/dvevyvqyt/image/upload/v1693391582/oqnfeejzh7xhwoovlnwr.jpg','test34','test12','ab12c@gmail.com','123455'),(15,'nguyenah316@gmail.com','$2a$10$nB.bsgnUbYF2UWq6Po0BiulVSRZ7c9ePU2P9A2.MuUE2wwJlo9Rom','PATIENT',NULL,'Nguyá»n Anh Quá»c','anhquoc@gmail.com','nquoc7952@gmail.com','+84858038081'),(16,'anhquoc0304','$2a$10$PUc38fd8/BRVJxdN8Qofrelp9kv.7TmjvVvi0ih0rrJgoylxmp.fy','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691080126/lrh4log4j28q3lgl5oxf.jpg','Nguyễn Anh Quốc','anhquoc@gmail.com','nquoc7952@gmail.com','+84858038081'),(17,'anhquoc0304n','$2a$10$oU51SlTgcQweKPgmZXBQzeRwG5nqkAogVN3sTl/3WnfF4wYmpsHXa','PATIENT',NULL,'Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(18,'anhquoc0304nv','$2a$10$jwFq6oRy6d4sF9FEQ.BvJOA6gpuVUcQaDcz0sWMPGSG0vOW89O1O.','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691080126/lrh4log4j28q3lgl5oxf.jpg','Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(19,'anhn0304','$2a$10$w7a9NXkwLMZggxj2sNJXPO6ozGrO8Ose/X84iiPIL7JvcQeEzKauS','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691080514/yuxdclia1jvsekoor2b2.jpg','Nguyễn Anh Quốc','206/20 đường số 20 phường 5 quận Gò Vấp Thành Phố Hồ Chí Minh','nquoc7952@gmail.com','0858038081'),(20,'anhqn12','$2a$10$XnqhiB064eiP7IsSugpMNuGb5GtmxRLyfUu7bM0MYJjhpNwcCo47O','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691082189/cp7nqn3clfrlg0uptltv.png','Nguyễn Trung Hiếu','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(26,'axdw123','$2a$10$oeeqOfv52XJ2da7BX49F.OTczEcbyxYqw5uVeaFfdEYB2qhto/V5O','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691570306/al4wkvqve2blbwqhtqec.jpg','Nguyễn Anh Quốc','Hồ Chí Minh','nguyenah316@gmail.com','+84858038081'),(29,'nurses','$2a$10$8j48D8AnqrAgE.Ko2w3GKed58NpQzV7f4MJR21bY9cxXk.kOXTnUq','NURSE','https://res.cloudinary.com/dvevyvqyt/image/upload/v1693599954/l2h2k46mozzs3nxeo2yx.jpg','Nguyễn Anh Quốc','Hồ Chí Minh','nguyenah316@gmail.com','+84858038081'),(30,'doctorThanh','$2a$10$oMWnXWbTkgDTDjLkKFrgDuIydX1hTUT2gggrTKXPeqiV.c1vthIfq','PATIENT',NULL,'Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(31,'testthuxxx','$2a$10$8UN4XZcrcdItRuQlXzlYX.752roIIuwowcl1/lvHS/7.6uwoKC.cK','PATIENT',NULL,'Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(34,'sdfggggg','$2a$10$hW5KZWJkjRBH5q4BpYpwRuNs2yEo7qf9UGV.dFcms8VQePKxj24zW','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691401850/bw78k3xi59a7cqlboe57.png','Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(37,'demodr','$2a$10$MIpQxhDnV48JHFWh/TXav.55DbvBoM.nmoApY8GU0L9/ykIjJZ1Li','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691424974/jbz1jsbu0plpld5eaowv.png','Nguyễn Anh Quốc','Hồ Chí Minh','nguyenah316@gmail.com','+84858038081'),(43,'syanhyt123','$2a$10$x16HvXRB58cNqBAURGd8ROcWWywyRrGvlRUZtfl1JATuAgcIB0rr.','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691566658/gxhhc2f1vdy8y49fmenp.jpg','Hồ Trần Sỹ Anh','Hồ Chí Minh','nguyenah316@gmail.com','+84858038081'),(47,'anhn123','$2a$10$plJlCNR4OFH6V9JyhiifFerdRweLlLDq25mezKENZoFCOYHbpoZJq','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691567620/bte3gyvvk7yrtlnlcswv.jpg','Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','0858038081'),(54,'anbc123','$2a$10$eE2IZV7jGVPld1Gm9fqYI.LYNKODA7oaY8Lc1dLUwIiG.DvP/84t2','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1691569068/ghcx0fqxgl6ixfwrnkvi.jpg','Nguyễn Anh Quốc','Hồ Chí Minh','nquoc7952@gmail.com','+84858038081'),(59,'testpostman','$2a$10$rmVIDGWURPNIa.3amTwp4uZF0Y9TCAxg3oEOkBtRpa/IBq6GxRjJK','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692720695/ep91e4zneqniqsoh5eli.jpg','test','test HCM','nquoc7952@gmail.com','0937383833'),(62,'dahshsa','$2a$10$waVY.PU/ZD/5Fn5Y2/deBuBp1jvoE7KGleHpoRRF743X4PyTiiXH.','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692797120/grssspqdfvhixsvpitzi.png','Hồ asdas','sasadas','ac@gmail.com','324241241'),(63,'d','$2a$10$LQVdCn4NRnFLkOZtvtSTKeIsRKtdVhBWxXTYsBSkbmd5wkqh6ZHCW','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692800326/tuookwge4rno7nwjdxe2.png','Hồ asdas','Hồ asdas','abx@gmail.com','Hồ asdas'),(64,'Hồ asdas1','$2a$10$o1PLa/dm.wRqg0fEiOJznO8evIhOUySkoFEA89DqT87ir4gmNcf0S','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692800596/gboag9n8ilc7gn05tyly.png','Hồ asdas','Hồ asdas','axc@gmail.com','Hồ asdas'),(68,'Hồ asdas11233','$2a$10$EDc7I6lh/Vso7.ghC5HKQunVoLkIa/uWwUz0C.z1NkhvUsuR4h5Zu','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692800656/biujd1berxvvcq43phvk.png','Hồ asdas','Hồ asdas','axc@gmail.com','Hồ asdas'),(69,'tam987','$2a$10$UB4fxJ5VM73XuhmsLv4RLu516.QzGs1GvNBMerrgjlfrygbqGob0.','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692800670/dd3zokxkljiadz0ob7xm.jpg','Hồ Văn Tâm','fsdfs','2051052111quoc@ou.edu.vn','093939234234'),(70,'tam987g4','$2a$10$CTJsG0sPizESjvsiMZ.pdu7v4pEEqur2VmD7EX/2230J7lSu.Tnam','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692801174/bzyonm0wygltrj2sv16w.jpg','Hồ Văn Tâm','fsdfs','2051052111quoc@ou.edu.vn','093939234234'),(71,'asdasaasd','$2a$10$s49B4oCGwfKyZeKmnW6VBeGUOdl/ucltfsvYSJB58X11LMWSDw2Cq','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692801861/w96jclm0d8cgpvusropy.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(72,'asdasaasd123','$2a$10$g13uXfOQrxRGYuzjcv.89O4TR0/BWMz9Fs.ypPjYAIoBtjLPlVayS','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802021/orga4aui1m3nqzngwvli.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(73,'asdasaasd12345','$2a$10$k8K/8pGTvRpcOpDbUR5kt.ad/07nPNDMvwbNcAOcPH/DQOIh40Xiu','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802168/qvlci6v6futddmegtopw.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(74,'asdasaasd12cxs','$2a$10$wqCj3YntQAh7KAIs6WGVcue2Os8Qf.2bcx8uGG30jHDPxhryrAxne','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802231/lzr45u2r8em8nbooczas.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(75,'asasd12cxs','$2a$10$lR6t7TwQMLMZn5VFjoPdVeiRFUzAtKb2tPYuzp47EU2fXlzW1kT4O','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802293/nkbqyjvuj0nchxkzezm4.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(76,'asasd12cxs3','$2a$10$8tHxreOLX77zP.DBdU5qY.5BNE1xWFoI2NaXAw8b3dgqS1THA3cpW','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802318/evtbzej9x74gox8kdr7x.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(77,'asasd12cms3','$2a$10$cXF2ndrEtMTGrK5mIu2mVeq9qg5idLvSctr9r5nvAX1cItOinnSyi','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692802363/xeskit6fthf2rktk1nbv.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','085809923'),(78,'tamnbc','$2a$10$WpBeCBcpV4NOaFnhlhooE.Zb6..5ww8L26j6Cfo7FDf6YrEdmLg/S','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692803715/cokbv79caqndhjydsmjx.jpg','Hồ Văn Tâm','fsdfs','anhquocn228@gmail.com','09763832'),(79,'tamnbc123','$2a$10$TVMzocicHdgwTIR/l8VqluJ.YQO6tWoKMRp/ZUvNq8K13Zh9SvtfK','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692803736/laatvbrzeqylzeycjj3g.jpg','Hồ Văn Tâm','fsdfs','anhquocn228@gmail.com','09763832'),(80,'123HVT','$2a$10$We9rlHU9I8EqhZmjpGJa8.NoTEDLrwc/cKmKuX/eD2a9YNRgRIXz6','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692803816/ju7zwowngwyeakolab4o.jpg','Hồ Văn Tâm','fsdfs','anhquocn228@gmail.com','0988439323'),(81,'4sdasdas','$2a$10$w1ddVrpCgVx55eR4Vb9d0OzuVcQwhnLHR4l6TCyFk3dVBHo5YbTOu','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692803928/rjpnd2kgysk3wprfu8e1.jpg','Hồ Văn Tâm','Hồ Văn Tâm','anhquocn228@gmail.com','53453552432'),(82,'4sdasdas123','$2a$10$e07MwpzRk8n/UZ3Xz6aw0Ox2WGcRqmQWv0dbvfmeIAtbCeClYmQQu','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692803957/yjaxpgd3rvmv9unni8a0.jpg','Hồ Văn Tâm','Hồ Văn Tâm','anhquocn228@gmail.com','53453552432'),(83,'testTam','$2a$10$/jnlxK1wGXoPDHL369K9KuGoYO7K0ypmFgWCK6jPb4uDQfCgIAEui','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692804106/u5j1gzydrtsxxkzewstx.jpg','Hồ Văn Tâm','sdasdasds','anhquocn228@gmail.com','098777322221'),(85,'Nf882nq','$2a$10$OK2HitQGPVkaQRyakJI06OSLvcEqOTkunypnNLKATtgo9vt0zaVU.','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692805032/ljnk8m8bcviogw2opfrw.jpg','Hồ Văn Tâm','fsdfs','nquoc7952@gmail.com','096577886'),(86,'admin123','$2a$10$cWACrtsEUnwAoLASFtSp2eBYnffxYsEaEDsf2lOAhLP5Z8AazC5N2','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692805966/pimysnfwtlzfdxp5w5uv.jpg','Hồ Văn Tâm','Hồ Văn Tâm','nquoc7952@gmail.com','0678576565'),(87,'admintam','$2a$10$vdZjONm2Xyw/DNrKRb9mueF0wbmxVJYKC3JP1E3xP.rFunnUKmvGi','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692806847/tgcdr7dymqlh0pf1vqhc.jpg','Hồ Văn Tâm','admin','nguyenah316@gmail.com','fsdfs'),(88,'test','$2a$10$HCL4yM4EWFyBx2YQXNCAbuEnv3kNqhMgMxVg./gKlv8Ga5u93bGM.','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692976599/k0y2gac2s6suexsyyxc1.jpg','Tester','fsdfs','nquoc7952@gmail.com','fsdfs'),(89,'fsdfs3333','$2a$10$jkb53QmCdWvY01M33L.Gd.e5efTq8dDB9hAH6WQpLcg64/hCKHfDy','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692976649/gh0iuh9qbohbmovjdwr4.jpg','Hồ Văn Tâm','fsdfs','2051052111quoc@ou.edu.vn','0977343224'),(90,'fsdfs','$2a$10$JNIPYp.IjEWr92.Prbkr0OmLD9zQ5RUIaIVX1LVDKMrbkDP/n1.xO','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692977261/lresuyq3w4prv0aeoywv.jpg','Hồ Văn Tâm','fsdfs','2051052111quoc@ou.edu.vn','0944324343'),(91,'Tester','$2a$10$OdAVf.Srmb01IdJTf5fkWex7sQ5ihrzceprKbVSEQsAjBNDQxSjJe','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1692978599/siqhhhbrrqsrgjprdepp.jpg','Hồ Văn Tâm','fsdfs','2051052111quoc@ou.edu.vn','09876543'),(99,'drtest12','$2a$10$5KfcCn8LYmRAc.3gk2lIDO5WAJoKRfV1nKgE0bRl/CZ6tEZHI1HR6','DOCTOR','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694079209/s8dgj7heri3dfosbxuzu.jpg','test12','Văn Lang','nquoc7952@gmail.com','0858038081'),(100,'dassdasad','$2a$10$AjKeoi1iN.KwmtQn1u6sGeTa7qziTtOc2uDjf5xWMjN1Fmy.bSnDm','NURSE','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694079278/rfderrwdnnltrs13zwkl.jpg','testdads','Hồ Văn Tâm','nquoc7952@gmail.com','097678877'),(101,'anh123','$2a$10$yR/1KyqgrPVaZSpTYWNDEOqb2c1agAHXP0dKd3OoQ6ILaw2JyfBdK','PATIENT','https://res.cloudinary.com/dvevyvqyt/image/upload/v1694239031/fehlbb8zxrfx3z5tlecb.jpg','Hồ Trần SỶ Anh ','HCM','nquoc7952@gmail.com','0974832');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-09 13:22:51
