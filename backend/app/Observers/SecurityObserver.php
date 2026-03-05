<?php

namespace App\Observers;

use App\Models\Contact;
use App\Models\SecurityLog;

class SecurityObserver
{
    /**
     * Handle the Contact "created" event.
     */
    public function created(Contact $contact): void
    {
        SecurityLog::create([
            'action' => 'CREATE',
            'model_type' => Contact::class,
            'model_id' => $contact->id,
            'description' => "Entity identification '{$contact->name}' has been authorized in the secure core.",
            'metadata' => $contact->toArray(),
            'ip_address' => request()->ip(),
        ]);
    }

    /**
     * Handle the Contact "updated" event.
     */
    public function updated(Contact $contact): void
    {
        // Only log if something actually changed
        if ($contact->wasChanged()) {
            SecurityLog::create([
                'action' => 'UPDATE',
                'model_type' => Contact::class,
                'model_id' => $contact->id,
                'description' => "Security clearance for fragment '{$contact->name}' was modified.",
                'metadata' => [
                    'before' => array_intersect_key($contact->getOriginal(), $contact->getChanges()),
                    'after' => $contact->getChanges(),
                ],
                'ip_address' => request()->ip(),
            ]);
        }
    }

    /**
     * Handle the Contact "deleted" event.
     */
    public function deleted(Contact $contact): void
    {
        SecurityLog::create([
            'action' => 'DELETE',
            'model_type' => Contact::class,
            'model_id' => $contact->id,
            'description' => "Fragment '{$contact->name}' has been purged from the active database.",
            'metadata' => $contact->toArray(),
            'ip_address' => request()->ip(),
        ]);
    }
}
