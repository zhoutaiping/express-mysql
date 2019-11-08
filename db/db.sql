CREATE TABLE `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名称',
  `age` int(3) unsigned zerofill NOT NULL DEFAULT '000' COMMENT '用户年龄',
  `status` int(2) DEFAULT '1' COMMENT '用户状态 1 true/0 false',
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

