<?php

namespace App\Services;

use App\Models\Process;

class ProcessService
{
  public function save(array $validated, ?Process $process = null): Process
  {

    if (!$process) {
      $process = Process::create([
        'number' => $validated['number'],
        'description' => $validated['description'],
        'id_status' => $validated['id_status'],
        'id_type' => $validated['id_type'],
        'id_user' => auth()->user()->id,
        'initial_cause_value' => $validated['initial_cause_value'],
        'final_cause_value' => $validated['final_cause_value'],
        'initial_fee_value' => $validated['initial_fee_value'],
        'final_fee_value' => $validated['final_fee_value'],
      ]);
    } else {
      $process->update([
        'number' => $validated['number'],
        'description' => $validated['description'],
        'id_status' => $validated['id_status'],
        'id_type' => $validated['id_type'],
        'id_user' => auth()->user()->id,
        'initial_cause_value' => $validated['initial_cause_value'],
        'final_cause_value' => $validated['final_cause_value'],
        'initial_fee_value' => $validated['initial_fee_value'],
        'final_fee_value' => $validated['final_fee_value'],
      ]);
    }

    return $process;
  }
}
