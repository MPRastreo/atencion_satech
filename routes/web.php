<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ProfileController;
use App\Models\Content;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () 
{
    try 
    {
        $content = Content::all();
        return Inertia::render('Content', ['content' => $content]);
    } 
    catch (Exception $ex) 
    {
        abort(Response::HTTP_INTERNAL_SERVER_ERROR, 'Error de servidor');
    }
});

Route::middleware('auth')->group(function () 
{
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('content', ContentController::class)->only('index', 'store', 'show');
});

require __DIR__.'/auth.php';
