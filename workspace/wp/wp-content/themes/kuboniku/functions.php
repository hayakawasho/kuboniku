<?php

// phpinfo();

$theme_includes = [
  '_inc/init.php',
  '_inc/register.php',
  '_inc/jwt.php',
];

foreach($theme_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'boilerplate'), $file), E_USER_ERROR);
  }

  require_once($filepath);
}

unset($file, $filepath);
