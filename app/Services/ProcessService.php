<?php

namespace App\Services;

use App\Models\Process;
use App\Models\DefaultTask;
use App\Models\Task;

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
      ]);
    } else {
      $process->update([
        'number' => $validated['number'],
        'description' => $validated['description'],
        'id_status' => $validated['id_status'],
        'id_type' => $validated['id_type'],
        'id_user' => auth()->user()->id,
      ]);
    }

    return $process;
  }
}
