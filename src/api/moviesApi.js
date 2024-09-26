export default class MoviesApi {
  apiConfig = {
    requestUrl: 'https://api.themoviedb.org/',
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
    const res = await fetch(`${this.apiConfig.requestUrl}/3/genre/movie/list?language=en`, options);
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
      `${this.apiConfig.requestUrl}/3/search/movie?query=${requestText}&include_adult=true&language=en-US&page=${pageNumber}`,
      options,
    );
    if (!res.ok) {
      throw new Error(`Could not fetch,received ${res.status}`);
    }
    return await res.json();
  }
}
