(ns clj-playground.core
  (:require [snow.client :as client]
            [clojure.core.reducers :as r]))

;; coz reddit blocks after a few reqs
(def h {"User-Agent" "Mozilla/5.0 (Windows NT 6.1;) Gecko/20100101 Firefox/13.0.1"})


(def subreddits ["clojure" "haskell" "scala" "javascript" "erlang" "elixir"
                 "common_lisp" "sports" "soccer"])

(defn fetch-subreddit-data [subreddit]
  (->> (client/get (str "https://reddit.com/r/" subreddit ".json")
                 {:header h})
     :data
     :children
     (map #(select-keys (:data %) [:url :title]))))

(println "map")
(time (apply concat (map fetch-subreddit-data subreddits)))

(println "pmap")
(time (count (apply concat (pmap fetch-subreddit-data subreddits))))

(println "reducers")
(time (count ) (r/mapcat fetch-subreddit-data subreddits))

(defn -main [& args]
  (println "Hello world"))
