<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// Public Routes (no authentication required)
use App\Http\Controllers\AuthController;

// Route::post('/signup', [AuthController::class, 'signup']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);



// // Route::get('/products', [ProductController::class, 'index']);
// // Route::post('/add', [ProductController::class, 'store']);


// use App\Http\Controllers\UserController;

// Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUser']);



// routes/api.php

// use App\Http\Controllers\ProductController;
// use App\Http\Controllers\AuthController;

// // Public routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// // Protected routes (require authentication)
// Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
// });
