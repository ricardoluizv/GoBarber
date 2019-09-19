module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true, // solicita ao banco de dados a utilizar a nomeclatura de tabelas neste formato ex: user_group
    underscoredAll: true,
  },
};
