"use strict";

import gulp from "gulp";
import browserSync from "browser-sync";
import sass from "gulp-sass";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import webpack from "webpack-stream";

sass.compiler = require("node-sass");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

const errorHandler = (err) => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
  })(err);
};

gulp.task("assets", function () {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
});

gulp.task("html", function () {
  return gulp
    .src("./src/content/**/*.html")
    .pipe(plumber(errorHandler))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("pwa", function () {
  return gulp.src("./src/pwa/**/*").pipe(gulp.dest("./dist/"));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: `Gulp error in ${err.plugin}`,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      postcss([
        autoprefixer({
          grid: true,
          browsers: [],
        }),
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("compile-ts", function () {
  return gulp
    .src("src/ts/**/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("dist/js"));
});

gulp.task(
  "serve",
  gulp.series("compile-ts", "sass", "pwa", "html", "assets", function () {
    browserSync.init({
      server: "./dist",
      open: true, // set to false to disable browser autostart
    });
    gulp.watch("src/scss/**/*", gulp.series("sass"));
    gulp.watch("src/content/**/*.html", gulp.series("html"));
    gulp.watch("src/pwa/**/*", gulp.series("pwa"));
    gulp.watch("src/assets/**/*", gulp.series("assets"));
    gulp.watch("src/ts/**/*.ts", gulp.series("compile-ts"));
    gulp.watch("dist/**/*").on("change", browserSync.reload);
  })
);

gulp.task("build", gulp.series("compile-ts", "sass", "pwa", "html", "assets"));
gulp.task("default", gulp.series("serve"));
