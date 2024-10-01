export default class MoviesApi {
  apiConfig = {
    requestUrl: 'https://api.themoviedb.org/3',
    imageUrl: 'https://image.tmdb.org/t/p/original',
    APIReadAccessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGNkMGQ3NDFlY2YxMTQzYWRiNzUyNjc4MzMyZTFmYiIsIm5iZiI6MTcyNjE3NTMxMy45OTk4NSwic3ViIjoiNjZlMzUyNzhmNDY3YzJhZDYyZjkzMGYwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1YGa5DCcKGn7WLbm9K7NY0IeED7GIzMIm4u86SEcoV4',
  };
  async getGenres() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiConfig.APIReadAccessToken}`,
      },
    };
    const res = await fetch(`${this.apiConfig.requestUrl}/genre/movie/list?language=en`, options);
    if (!res.ok) {
      throw new Error(`Could not fetch,received ${res.status}`);
    }
    const genresResponse = await res.json();
    const genresArray = {};
    for (let key of genresResponse.genres) {
      genresArray[key.id] = key.name;
    }
    return genresArray;
  }
  async getMoviesList(pageNumber, requestText) {
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiConfig.APIReadAccessToken}`,
      },
    };
    const res = await fetch(
      `${this.apiConfig.requestUrl}/search/movie?query=${requestText}&include_adult=true&language=en-US&page=${pageNumber}`,
      options,
    );
    if (!res.ok) {
      throw new Error(`Could not fetch,received ${res.status}`);
    }
    return await res.json();
  }
  async createGuestSession() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiConfig.APIReadAccessToken}`,
      },
    };
    const session = await fetch(
      `${this.apiConfig.requestUrl}/authentication/guest_session/new`,
      options,
    );
    return await session.json();
  }
  async addRateMovie(sessionId, movieId, rateValue) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.apiConfig.APIReadAccessToken}`,
      },
      body: JSON.stringify({ value: rateValue }),
    };
    const addRate = await fetch(
      `${this.apiConfig.requestUrl}/movie/${movieId}/rating?guest_session_id=${sessionId}`,
      options,
    );
    const addRateRequest = await addRate.json();
    return addRateRequest.success;
  }
  async getRatedList(sessionId) {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.apiConfig.APIReadAccessToken}`,
      },
    };
    const reslist = await fetch(
      `${this.apiConfig.requestUrl}/guest_session/${sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options,
    );
    return await reslist.json();
  }
}
