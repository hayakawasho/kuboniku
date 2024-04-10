<?php

function custom_jwt_refresh_expiration( $default_exp ) {
  return $default_exp - (DAY_IN_SECONDS * 275); // 有効期限90日間
}

add_filter('graphql_jwt_auth_refresh_token_expiration', 'custom_jwt_refresh_expiration');
