<?php

namespace Tests\Feature;

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_contacts(): void
    {
        Contact::factory()->count(3)->create();

        $response = $this->getJson('/api/contacts');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_can_create_contact(): void
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'company' => 'Acme Corp',
            'status' => 'lead'
        ];

        $response = $this->postJson('/api/contacts', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'John Doe']);

        $this->assertDatabaseHas('contacts', ['name' => 'John Doe']);
    }

    public function test_can_update_contact(): void
    {
        $contact = Contact::create(['name' => 'Old Name']);

        $response = $this->putJson("/api/contacts/{$contact->id}", [
            'name' => 'New Name'
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'New Name']);

        $this->assertDatabaseHas('contacts', ['name' => 'New Name']);
    }

    public function test_can_delete_contact(): void
    {
        $contact = Contact::create(['name' => 'Delete Me']);

        $response = $this->deleteJson("/api/contacts/{$contact->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }
}
