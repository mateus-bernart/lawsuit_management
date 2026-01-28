<?php

namespace App\Http\Controllers;

use App\Http\Requests\FinancialRecordRequest;
use App\Models\Category;
use App\Models\FinancialRecord;
use App\Models\Process;
use App\Models\FinancialRecordStatus;
use App\Models\FinancialRecordType;
use App\Services\FinancialRecordService;
use Illuminate\Http\Request;

class FinancialRecordController extends Controller
{
    public function index()
    {
        $userId = auth()->user()->id;

        $financialRecords =
            FinancialRecord::where('id_user', $userId)
            ->with(["statuses", "category", "type", "process"])
            ->get()
            ->map(function ($record) {
                return [
                    ...$record->toArray(),
                    'type_description' => $record->type?->description ?? '',
                    'category_description' => $record->category?->description ?? '',
                    'status_description' => $record->statuses?->description,
                    'process_number' => $record->process?->number ?? '',
                    'created_at' => $record->created_at ?? ''
                ];
            });

        $statuses = FinancialRecordStatus::all();
        $categories = Category::all();
        $types = FinancialRecordType::all();

        return inertia('FinancialRecord/Index')->with([
            'financialRecords' => $financialRecords,
            'statuses' => $statuses,
            'categories' => $categories,
            'types' => $types,
        ]);
    }

    public function create()
    {
        $financialRecords =
            FinancialRecord::with("statuses")
            ->with("category")
            ->with("type")
            ->get();

        $statuses = FinancialRecordStatus::all();
        $categories = Category::all();
        $types = FinancialRecordType::all();
        $processes = Process::all();

        return inertia('FinancialRecord/Create')->with([
            'financialRecords' => $financialRecords,
            'statuses' => $statuses,
            'categories' => $categories,
            'types' => $types,
            'processes' => $processes
        ]);
    }

    public function store(FinancialRecordRequest $request, FinancialRecordService $service)
    {
        $service->save($request->validated());
        return redirect()->route('financial-record.index')
            ->with('success', 'Registro salvo com sucesso.');
    }

    public function update(FinancialRecordRequest $request, FinancialRecordService $service, FinancialRecord $financialRecord)
    {
        $service->save($request->validated(), $financialRecord);
        return redirect()->route('financial-record.index')->with('success', 'FinancialRecordo atualizado com sucesso.');
    }

    public function edit(FinancialRecord $financialRecord)
    {
        $userId = auth()->user()->id;

        $statuses = FinancialRecordStatus::all();
        $processes = Process::where('id_user', $userId)->get();
        $types = FinancialRecordType::all();
        $categories = Category::all();

        return inertia('FinancialRecord/Create')->with([
            'financialRecord' => $financialRecord,
        ])
            ->with([
                'statuses' => $statuses,
                'processes' => $processes,
                'types' => $types,
                'categories' => $categories
            ]);
    }

    public function destroy(FinancialRecord $financialRecord)
    {
        $financialRecord->delete();
        return redirect()->route('financial-record.index')->with('success', "FinancialRecordo removido com sucesso!");
    }

    public function toggleStatus(FinancialRecord $financialRecord, Request $request)
    {
        $request->validate([
            'id_status' => 'required|exists:financial_record_statuses,id',
        ]);

        $financialRecord->id_status = $request->id_status;
        $financialRecord->save();

        return back()->with("success", "FinancialRecordStatus do processo atualizado!");
    }

    public function changeStatus(FinancialRecord $financialRecord, $status)
    {
        $financialRecord->status = $status;
        $financialRecord->save();

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

        return redirect()->route('financial-record.index')->with('success', "Registro marcado como {$message}!");
    }
}
