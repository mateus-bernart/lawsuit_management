<?php

namespace App\Services;

use App\Models\FinancialRecord;
use App\Models\DefaultTask;
use App\Models\Task;

class FinancialRecordService
{
  public function save(array $validated, ?FinancialRecord $financialRecord = null): FinancialRecord
  {
    if (!$financialRecord) {
      $financialRecord = FinancialRecord::create([
        'id_type' => $validated['id_type'],
        'id_category' => $validated['id_category'],
        'id_process' => $validated['id_process'] === "0" ? null : $validated['id_process'],
        'id_status' => $validated['id_status'],
        'description' => $validated['description'],
        'value' => $validated['value'],
      ]);
    } else {
      $financialRecord->update([
        'id_type' => $validated['id_type'],
        'id_category' => $validated['id_category'],
        'id_process' => $validated['id_process'],
        'id_status' => $validated['id_status'],
        'description' => $validated['description'],
        'value' => $validated['value'],
      ]);
    }

    return $financialRecord;
  }
}
