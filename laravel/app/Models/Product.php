<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'size',
        'price',
        'image',
        'user_id', // Include user_id in the fillable array to allow mass assignment
    ];

    // Define the relationship between Product and User models
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
