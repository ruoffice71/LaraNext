<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRegisterRequest;
use App\Http\Resources\AuthResponseResource;
use App\Manager\Api\CommonResponse;
use App\Manager\Utility\Utility;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class AuthController extends Controller
{
    use CommonResponse;

    /**
     * @param AuthRegisterRequest $request
     * @return JsonResponse
     */
    final public function register(AuthRegisterRequest $request) : JsonResponse
    {
        try {
            DB::beginTransaction();
            $user = (new User())->register($request);
            // todo: Need to assign role
            // todo: Need to keep user's ip address

            $this->data = [
                'token' => $user->createToken($user->phone)->plainTextToken,
                'user' => new AuthResponseResource($user)
            ];

            $this->status_message = __('User created successfully!');

            DB::commit();
        } catch (Throwable $throwable) {
            DB::rollBack();
            failed_log('USER_REGISTER_FAILD', $throwable, $request);
            $this->failed($throwable);
        }
        return $this->response();
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    final public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email_or_phone' => 'required',
            'password' => 'required|'
        ]);

        try {
            $collumn = 'email';
            if (Utility::is_phone($request->input('email_or_phone'))) {
                $collumn = 'phone';
            }

            $user = (new User())->get_auth_user($collumn, $request->input('email_or_phone'));
            if ($user){
                if(Hash::check($request->input('password'), $user->password)) {
                    if ($user->status == User::STATUS_INACTIVE) {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'User not active!.',
                        ]);
                    }
                    if ($user->status == User::STATUS_HOLD) {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'Your account is on hold!.',
                        ]);
                    }
                    if ($user->status == User::STATUS_PENDING) {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'Your account is pending.',
                        ]);
                    }
                    if ($user->status == User::STATUS_SUSPENDED) {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'Your account is suspended!',
                        ]);
                    }
                    if ($user->status == User::STATUS_BLOCKED) {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'Your account is blocked!',
                        ]);
                    }
                    if ($user->status == User::STATUS_ACTIVE) {
                        $this->data = [
                            'token' => $user->createToken($user->phone)->plainTextToken,
                            'user' => new AuthResponseResource($user)
                        ];
                        $this->status_message = __('User login successfully!');
                    }else {
                        throw ValidationException::withMessages([
                            'email_or_phone' => 'Something went wrong!',
                        ]);
                    }
                } else {
                    throw ValidationException::withMessages([
                        'password' => 'Password not matched!.',
                    ]);
                }
            } else {
                throw ValidationException::withMessages([
                    'email_or_phone' => 'User not found!.',
                ]);
            }
        } catch (Throwable $throwable) {
            failed_log('USER_LOGIN_FAILD', $throwable, $request);
            $this->failed($throwable);
        }

        return $this->response();
    }
}
