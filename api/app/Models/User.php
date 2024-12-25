<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Http\Requests\AuthRegisterRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    public const STATUS_INACTIVE = 0;
    public const STATUS_ACTIVE = 1;
    public const STATUS_HOLD = 2;
    public const STATUS_PENDING = 3;
    public const STATUS_SUSPENDED = 4;
    public const STATUS_BLOCKED = 5;

    public const STATUS_LIST = [
        self::STATUS_INACTIVE => 'Inactive',
        self::STATUS_ACTIVE => 'Active',
        self::STATUS_HOLD => 'Hold',
        self::STATUS_PENDING => 'Pending',
        self::STATUS_SUSPENDED => 'Suspended',
        self::STATUS_BLOCKED => 'blocked',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * @param AuthRegisterRequest $request
     * @return Builder|Model
     */
    final public function register(AuthRegisterRequest $request):Builder|Model
    {
        return self::query()->create($this->prepare_data($request));
    }

    /**
     * @param AuthRegisterRequest $request
     * @return array
     */
    private function prepare_data(AuthRegisterRequest $request):array
    {
        return [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'status' => self::STATUS_ACTIVE,
            'password' => Hash::make($request->input('password')),
        ];
    }

    /**
     * @param string $collumn
     * @param string $value
     * @return Builder|Model|null
     */
    final public function get_auth_user(string $collumn, string $value):Builder|Model|null
    {
        return self::query()->where($collumn, $value)->first();
    }
}
