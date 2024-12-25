<?php

namespace App\Manager\Api;

use Illuminate\Http\JsonResponse;
use Throwable;

trait CommonResponse
{
    public int $status_code_success = 200;
    public int $status_code_faild = 460;
    public mixed $data = null;
    public bool $status = true;
    public string $status_message = 'Success';
    public string $status_code = '200';
    public string $status_class = 'success';
    public JsonResponse $response;

    final public function response(): JsonResponse
    {
        return response()->json([
            'status' => $this->status,
            'status_message' => $this->status_message,
            'status_code' => $this->status_code,
            'status_class' => $this->status_class,
            'data' => $this->data
        ]);
    }

    /**
     * @param Throwable $throwable
     * @return void
     */
    final public function failed(Throwable $throwable): void
    {
        $this->status_message = __('Faild!' . $throwable->getMessage());
        $this->status_code = $this->status_code_faild;
        $this->status_class = 'danger';
        $this->status = false;
    }
}
