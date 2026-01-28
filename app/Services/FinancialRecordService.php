<?php

namespace App\Services;

use App\Models\FinancialRecord;
use App\Models\DefaultTask;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class FinancialRecordService
{
  public function save(array $validated, ?FinancialRecord $financialRecord = null): FinancialRecord
  {
    $idProcess = ($validated['id_process'] === "0" || empty($validated['id_process'])) ? null : $validated['id_process'];

    if (!$financialRecord) {
      $financialRecord = FinancialRecord::create([
        'id_type' => $validated['id_type'],
        'id_category' => $validated['id_category'],
        'id_process' => $idProcess,
        'id_status' => $validated['id_status'],
        'id_user' => auth()->user()->id,
        'description' => $validated['description'],
        'value' => $validated['value'],
      ]);
    } else {
      $financialRecord->update([
        'id_type' => $validated['id_type'],
        'id_category' => $validated['id_category'],
        'id_process' => $idProcess,
        'id_status' => $validated['id_status'],
        'id_user' => auth()->user()->id,
        'description' => $validated['description'],
        'value' => $validated['value'],
      ]);
    }

    return $financialRecord;
  }
}
