<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * @param string $name
 * @param Throwable $throwable
 * @param Request|null $request
 * @return void
 */
function failed_log($name, Throwable $throwable, Request|null $request = null) : void
{
    Log::error($name, [
        'message' => $throwable->getMessage(),
        'line' => $throwable->getLine(),
        'file' => $throwable->getFile(),
        'request' => $request?->all(),
        'throwable' => $throwable
    ]);
}


