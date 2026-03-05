<?php

namespace App\Http\Controllers;

use App\Models\SecurityLog;
use App\Models\Contact;
use App\Http\Resources\SecurityLogResource;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class SecurityLogController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the security logs.
     */
    public function index()
    {
        $logs = SecurityLog::orderBy('created_at', 'desc')->paginate(50);
        return SecurityLogResource::collection($logs);
    }

    /**
     * Provide dashboard statistics.
     */
    public function stats()
    {
        $totalContacts = Contact::count();
        $activeLeads = Contact::where('status', 'lead')->count();
        $totalEvents = SecurityLog::count();
        $recentEvents = SecurityLog::where('created_at', '>=', now()->subHours(24))->count();

        return $this->successResponse([
            'total_contacts' => $totalContacts,
            'active_leads' => $activeLeads,
            'total_security_events' => $totalEvents,
            'recent_security_events' => $recentEvents,
            'last_updated' => now()->format('Y-m-d H:i:s'),
        ], 'Tactical intelligence synchronized.');
    }
}
