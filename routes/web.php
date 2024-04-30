<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function ()
{
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('content', ContentController::class)->only('index', 'store');
});

require __DIR__.'/home.php';
require __DIR__.'/auth.php';
