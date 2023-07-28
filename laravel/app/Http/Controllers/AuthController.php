<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('appToken')->plainTextToken;

        return response(['user' => $user, 'token' => $token], 201);
    }







    public function login(Request $request)
{
    // Validation
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    // Check credentials
    if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Get the authenticated user
    $user = $request->user();

    // Create and return access token
    $token = $user->createToken('authToken')->accessToken;

    // Return the user's name along with the token
    return response()->json(['name' => $user->name, 'token' => $token], 200);
}


}
