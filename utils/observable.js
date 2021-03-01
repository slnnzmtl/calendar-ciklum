const observable = new Observable((observer) => {
    const datasource = new DataSource();
    datasource.ondata = (e) => observer.next(e);
    datasource.onerror = (err) => observer.error(err);
    datasource.oncomplete = () => observer.complete();
  return () => {
      console.log('Зрелище завершилось или' +
                  'все зрители отписались от зрелища');
    }
  })

  export default observable;