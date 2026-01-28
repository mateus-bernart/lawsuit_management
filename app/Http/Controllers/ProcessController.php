<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessRequest;
use App\Models\Process;
use App\Models\ProcessType;
use App\Models\ProcessStatus;
use App\Services\ProcessService;
use Illuminate\Http\Request;

class ProcessController extends Controller
{
    public function index()
    {
        $userId = auth()->user()->id;

        $processes = Process::where('id_user', $userId)
            ->with("statuses")->with('type')->get()
            ->map(function ($record) {
                return [
                    ...$record->toArray(),
                    'type_description' => $record->type?->description ?? '',
                    'status_description' => $record->statuses?->description,
                ];
            });;

        $statuses = ProcessStatus::all();

        return inertia('Process/Index')->with([
            'processes' => $processes,
            'statuses' => $statuses,
        ]);
    }

    public function create()
    {
        $statuses = ProcessStatus::all();
        $types = ProcessType::all();
        return inertia('Process/Create')->with(['statuses' =>  $statuses, 'types' => $types]);
    }

    public function store(ProcessRequest $request, ProcessService $service)
    {
        $service->save($request->validated());
        return redirect()->route('process.index')
            ->with('success', 'Processo salvo com sucesso.');
    }

    public function update(ProcessRequest $request, ProcessService $service, Process $process)
    {
        $service->save($request->validated(), $process);
        return redirect()->route('process.index')->with('success', 'Processo atualizado com sucesso.');
    }

    public function edit(Process $process)
    {
        $statuses = ProcessStatus::all();
        $types = ProcessType::all();

        return inertia('Process/Create')->with([
            'process' => $process,
            'number' => $process->number,
            'description' => $process->description,
            'id_status' => $process->id_status,
            'id_type' => $process->id_type,
        ])->with(['statuses' => $statuses, 'types' => $types]);
    }

    public function destroy(Process $process)
    {
        $process->delete();
        return redirect()->route('process.index')->with('success', "Processo removido com sucesso!");
    }

    public function toggleActive(Process $process)
    {
        $process->active === 1 ? $process->active = 0 : $process->active = 1;
        $process->save();
        return back()->with("success", "Processo atualizado com sucesso!");
    }

    public function toggleStatus(Process $process, Request $request)
    {
        $request->validate([
            'id_status' => 'required|exists:process_statuses,id',
        ]);

        $process->id_status = $request->id_status;
        $process->save();

        return back()->with("success", "Status do processo atualizado!");
    }

    public function changeStatus(Process $process, $status)
    {
        $process->status = $status;
        $process->save();

        $message = '';
        switch ($status) {
            case '2':
                $message = "em preparação";
                break;
            case '3':
                $message = "pronto para entrega";
                break;
            case '4':
                $message = "entregue";
                break;
            default:
                break;
        }

        return redirect()->route('process.index')->with('success', "Processo marcado como {$message}!");
    }
}
