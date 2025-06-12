module.exports = {
  apps: [
    {
      name: "composer", // имя процесса в PM2
      script: "./node_modules/.bin/next", // запускаем binary next напрямую
      args: "start", // аргумент для next: start (production)
      cwd: __dirname, // рабочая директория
      output: "./logs/composer-out.log", // куда писать stdout
      error: "./logs/composer-err.log", // куда писать stderr
      merge_logs: true, // объединять stdout и stderr в одну ленту
      log_date_format: "YYYY-MM-DD HH:mm:ss", // формат даты в логах
    },
  ],
};
