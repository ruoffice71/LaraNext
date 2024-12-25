<?php

namespace App\Manager\Utility;

class Utility
{
    final public static function is_phone(string $phone): bool
    {
        $is_phone = false;
        if (preg_match('/^01\d*$/', $phone)) {
            $is_phone = true;
        }
        return $is_phone;
    }
}
