CREATE DATABASE  IF NOT EXISTS `diary_activity` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `diary_activity`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: diary_activity
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `state` enum('pendiente','en proceso','completada') NOT NULL,
  `priority` enum('alta','media','baja') NOT NULL DEFAULT 'media',
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_usuarios_actividades` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,1,'Hacer ejercicio','Hacer 30 minutos de ejercicio','pendiente','alta','2024-10-24 02:03:08','2024-10-24 02:03:08'),(2,2,'Leer un libro','Leer 20 páginas del libro de productividad','en proceso','media','2024-10-24 02:03:08','2024-10-24 02:03:08'),(3,3,'Estudiar programación','Estudiar JavaScript por 1 hora','completada','baja','2024-10-24 02:03:08','2024-10-24 02:03:08');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Salud'),(2,'Crecimiento personal'),(3,'Educación');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collaborations`
--

DROP TABLE IF EXISTS `collaborations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collaborations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_fk` int NOT NULL,
  `user_fk` int NOT NULL,
  `role` enum('creador','colaborador') NOT NULL DEFAULT 'colaborador',
  PRIMARY KEY (`id`,`role`),
  KEY `FK_actividad_colaboraciones` (`activity_fk`),
  KEY `FK_usuario_colaboraciones` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborations`
--

LOCK TABLES `collaborations` WRITE;
/*!40000 ALTER TABLE `collaborations` DISABLE KEYS */;
INSERT INTO `collaborations` VALUES (1,1,2,'colaborador'),(2,2,3,'colaborador'),(3,3,1,'creador');
/*!40000 ALTER TABLE `collaborations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `expiration_date` datetime DEFAULT NULL,
  `state` enum('activo','pendiente','suspendido') NOT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_usuarios_objetivos` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
INSERT INTO `goals` VALUES (1,1,'Perder 5 kg en 2 meses','Objetivo de pérdida de peso mediante dieta y ejercicio','2024-12-01 00:00:00','activo','2024-10-24 02:03:08'),(2,2,'Leer 5 libros en 3 meses','Mejorar los hábitos de lectura','2024-11-01 00:00:00','pendiente','2024-10-24 02:03:08'),(3,3,'Aprender JavaScript','Completar curso de JavaScript','2024-12-31 00:00:00','activo','2024-10-24 02:03:08');
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labels`
--

DROP TABLE IF EXISTS `labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activities_fk` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `category_fk` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_actividades_etiquetas` (`activities_fk`),
  KEY `FK_categorias_etiquetas` (`category_fk`),
  CONSTRAINT `FK_actividades_etiquetas` FOREIGN KEY (`activities_fk`) REFERENCES `activities` (`id`),
  CONSTRAINT `FK_categorias_etiquetas` FOREIGN KEY (`category_fk`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labels`
--

LOCK TABLES `labels` WRITE;
/*!40000 ALTER TABLE `labels` DISABLE KEYS */;
INSERT INTO `labels` VALUES (1,1,'Salud',1),(2,2,'Crecimiento personal',2),(3,3,'Educación',3);
/*!40000 ALTER TABLE `labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone`
--

DROP TABLE IF EXISTS `milestone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `goal_fk` int NOT NULL,
  `description` text NOT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_objetivo_hitos` (`goal_fk`),
  CONSTRAINT `FK_objetivo_hitos` FOREIGN KEY (`goal_fk`) REFERENCES `goals` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (1,1,'Perder 1 kg en la primera semana','2024-10-24 02:03:08',0),(2,2,'Leer el primer libro','2024-10-24 02:03:08',1),(3,3,'Completar el módulo básico de JavaScript','2024-10-24 02:03:08',0);
/*!40000 ALTER TABLE `milestone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activities_fk` int DEFAULT NULL,
  `reminder_date` datetime NOT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  KEY `FK_actividades_recordatorios` (`activities_fk`),
  CONSTRAINT `FK_actividades_recordatorios` FOREIGN KEY (`activities_fk`) REFERENCES `activities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES (1,1,'2024-10-12 08:00:00','Recordatorio: Hacer ejercicio por la mañana'),(2,2,'2024-10-12 18:00:00','Recordatorio: Leer antes de acostarte'),(3,3,'2024-10-13 10:00:00','Revisar conceptos de JavaScript');
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int NOT NULL,
  `report_type` enum('diario','semanal','mensual') NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `completed_activities` int DEFAULT '0',
  `completed_goals` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_usuario_reportes` (`user_fk`),
  CONSTRAINT `FK_usuario_reportes` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'semanal','2024-10-01 00:00:00','2024-10-07 23:59:59',3,1),(2,2,'mensual','2024-09-01 00:00:00','2024-09-30 23:59:59',10,2),(3,3,'diario','2024-10-11 00:00:00','2024-10-11 23:59:59',1,0);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int DEFAULT NULL,
  `stadistic_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `completed_activities` int NOT NULL,
  `objectives_completed` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_usuarios_estadisticas` (`user_fk`),
  CONSTRAINT `FK_usuarios_estadisticas` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (1,1,'2024-10-24 02:03:08',10,2),(2,2,'2024-10-24 02:03:08',5,1),(3,3,'2024-10-24 02:03:08',7,3);
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_nombre_usuario` (`username`),
  UNIQUE KEY `UC_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'juanperez','juanperez@gmail.com','$2a$10$XLMnF4lQDKWwqUG3qUHZsOhEJskyiYAzLlhmHYQvHW5al6KwxveYi','2024-10-24 02:03:08','2024-10-25 09:30:38'),(2,'mariaruiz','mariaruiz@hotmail.com','$2a$10$89xucxTfAY0opASB/q5J0OXuf2Or35Pa/yGJ.FDNH65.9aFZU8GuC','2024-10-24 02:03:08','2024-10-25 04:26:21'),(3,'carloslopez','carloslopez@yahoo.com','$2a$10$89xucxTfAY0opASB/q5J0OXuf2Or35Pa/yGJ.FDNH65.9aFZU8GuC','2024-10-24 02:03:08','2024-10-25 04:26:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 23:55:39
