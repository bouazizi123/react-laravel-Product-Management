<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        // Get all products
        $products = Product::all();
        return response()->json(['products' => $products], 200);
    }

    public function show($id)
    {
        // Find a product by its ID
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['product' => $product], 200);
    }

    public function store(Request $request)
{
    // Validation
    $request->validate([
        'name' => 'required|string',
        'description' => 'nullable|string',
        'size' => 'nullable|string',
        'price' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'user_id' => 'required|exists:users,id',
    ]);

    // Upload the image (if provided)
    $imagePath = null;
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $imagePath = $image->storeAs('images', $imageName, 'public');
    }

    // Create a new product
    $product = new Product([
        'name' => $request->input('name'),
        'description' => $request->input('description'),
        'size' => $request->input('size'),
        'price' => $request->input('price'),
        'image' => $imagePath,
        'user_id' => $request->input('user_id'),
    ]);

    $product->save();

    return response()->json(['product' => $product], 201);
}

    public function update(Request $request, $id)
    {
        // Find a product by its ID
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validation
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'size' => 'nullable|string',
            'price' => 'required|integer',
            'image' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Update the product
        $product->update($request->all());

        return response()->json(['product' => $product], 200);
    }

    public function destroy($id)
    {
        // Find a product by its ID
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the product
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
