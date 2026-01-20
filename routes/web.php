<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // ============= PROCESSES
    Route::get('/processes', [App\Http\Controllers\ProcessController::class, 'index'])->name('process.index');

    Route::get('/processes/create', [App\Http\Controllers\ProcessController::class, 'create'])->name('process.create');
    Route::post('/processes', [App\Http\Controllers\ProcessController::class, 'store'])->name('process.store');
    Route::get('/processes/{process}/edit', [App\Http\Controllers\ProcessController::class, 'edit'])->name('process.edit');
    Route::post('/processes/{process}', [App\Http\Controllers\ProcessController::class, 'update'])->name('process.update');
    Route::delete('/processes/{process}', [App\Http\Controllers\ProcessController::class, 'destroy'])->name('process.destroy');
    Route::put('/processes/{process}/toggle-active', [App\Http\Controllers\ProcessController::class, 'toggleActive'])->name('process.toggleActive');
    Route::put('/processes/{process}/toggle-status', [App\Http\Controllers\ProcessController::class, 'toggleStatus'])->name('process.toggleStatus');

    // ============= FINANCIAL RECORDS
    Route::get('/financial-records', [App\Http\Controllers\FinancialRecordController::class, 'index'])->name('financial-record.index');

    Route::get('/financial-records/create', [App\Http\Controllers\FinancialRecordController::class, 'create'])->name('financial-record.create');
    Route::post('/financial-records', [App\Http\Controllers\FinancialRecordController::class, 'store'])->name('financial-record.store');
    Route::get('/financial-records/{financial-record}/edit', [App\Http\Controllers\FinancialRecordController::class, 'edit'])->name('financial-record.edit');
    Route::post('/financial-records/{financial-record}', [App\Http\Controllers\FinancialRecordController::class, 'update'])->name('financial-record.update');
    Route::delete('/financial-records/{financial-record}', [App\Http\Controllers\FinancialRecordController::class, 'destroy'])->name('financial-record.destroy');
    Route::put('/financial-records/{financial-record}/toggle-active', [App\Http\Controllers\FinancialRecordController::class, 'toggleActive'])->name('financial-record.toggleActive');
    Route::put('/financial-records/{financial-record}/toggle-status', [App\Http\Controllers\FinancialRecordController::class, 'toggleStatus'])->name('financial-record.toggleStatus');
});

require __DIR__ . '/settings.php';
