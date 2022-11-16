\c nc_news_test

SELECT COUNT(comment_id) as comment_count FROM comments
WHERE article_id = 1;