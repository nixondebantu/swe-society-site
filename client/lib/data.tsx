export async function getEvents() {
    try {
      const response = await fetch('http://localhost:5050/event', { 
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      return response.json();
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch events');
    }
  }