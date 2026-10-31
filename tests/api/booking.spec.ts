import { test, expect } from '@playwright/test';

test('GET booking ids returns a list', async ({ request }) => {
  const response = await request.get('/booking');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('bookingid');
});

test('POST creates a booking and GET returns it', async ({ request }) => {
  const newBooking = {
    firstname: 'Yaniv',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-11-01',
      checkout: '2026-11-05',
    },
    additionalneeds: 'Breakfast',
  };

  const createResponse = await request.post('/booking', {
    data: newBooking,
  });
  expect(createResponse.status()).toBe(200);

  const created = await createResponse.json();
  expect(created.booking.firstname).toBe('Yaniv');
  const bookingId = created.bookingid;

  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse.status()).toBe(200);

  const fetched = await getResponse.json();
  expect(fetched).toMatchObject(newBooking);
});
async function getToken(request: any): Promise<string> {
  const response = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  return body.token;
}

test('PUT updates a booking', async ({ request }) => {
  const token = await getToken(request);

  // יוצרים הזמנה לעדכון
  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'Yaniv',
      lastname: 'Tester',
      totalprice: 150,
      depositpaid: true,
      bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
      additionalneeds: 'Breakfast',
    },
  });
  const { bookingid } = await createResponse.json();

  // מעדכנים
  const updated = {
    firstname: 'Yaniv',
    lastname: 'Updated',
    totalprice: 200,
    depositpaid: false,
    bookingdates: { checkin: '2026-11-01', checkout: '2026-11-07' },
    additionalneeds: 'Dinner',
  };
  const putResponse = await request.put(`/booking/${bookingid}`, {
    data: updated,
    headers: { Cookie: `token=${token}` },
  });
  expect(putResponse.status()).toBe(200);

  // מוודאים שהשינוי נשמר
  const getResponse = await request.get(`/booking/${bookingid}`);
  expect(await getResponse.json()).toMatchObject(updated);
});

test('DELETE removes a booking', async ({ request }) => {
  const token = await getToken(request);

  const createResponse = await request.post('/booking', {
    data: {
      firstname: 'Delete',
      lastname: 'Me',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-11-01', checkout: '2026-11-03' },
    },
  });
  const { bookingid } = await createResponse.json();

  const deleteResponse = await request.delete(`/booking/${bookingid}`, {
    headers: { Cookie: `token=${token}` },
  });
  expect(deleteResponse.status()).toBe(201);

  // אחרי המחיקה ההזמנה לא אמורה להימצא
  const getResponse = await request.get(`/booking/${bookingid}`);
  expect(getResponse.status()).toBe(404);
});