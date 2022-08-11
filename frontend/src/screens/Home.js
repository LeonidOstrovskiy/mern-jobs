const Home = () => {
  return (
    <div
      className="div-center flex fs-800 ff-sans-cond"
      style={{ backgroundColor: 'hsl(var(--clr-light) / 60%)' }}
    >
      <h3 style={{ marginTop: '10%', marginInline: '10%' }}>
        {' '}
        This is a self-study MERN project with basic user authentification and
        simple functionalities. To simulate I created several dummy users one of
        which is me. Feel free to create your dummy users for testing.
      </h3>
      <h3> Here you can save your mini - cv or find your new employee </h3>{' '}
      <h4 style={{ width: '80%', marginTop: '10%' }}>
        {' '}
        To find a new employee for your company click on 'Find your employee'.
        Type in the search field who you are looking for. A list of specialists
        corresponding to your search criterium will be displayed. To get more
        information about a particular person, click on it.{' '}
      </h4>
      <h4 style={{ marginInline: '10%' }}>
        If you want to save your working experience and make it accessible to
        your future employers, you must register first.{' '}
      </h4>{' '}
    </div>
  );
};

export default Home;
