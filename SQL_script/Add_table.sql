/*Add in Table*/

CREATE TABLE `userdb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` TINYTEXT NOT NULL,
  `password` TINYTEXT NOT NULL,
  `first_name` TINYTEXT NOT NULL,
  `last_name` TINYTEXT NOT NULL,
  `account_type` ENUM('Admin', 'Adopt', 'User') NOT NULL,
  `email` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`));