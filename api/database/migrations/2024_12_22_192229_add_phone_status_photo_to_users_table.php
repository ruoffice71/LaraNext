<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', static function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->tinyInteger('status')->nullable()->index()->after('phone');
            $table->string('photo')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', static function (Blueprint $table) {
            $table->dropColumn('phone');
            $table->dropColumn('status');
            $table->dropColumn('photo');
        });
    }
};
