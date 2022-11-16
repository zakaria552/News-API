\c nc_news_test


        SELECT articles.author, title, articles.article_id, topic, articles.created_at, 
        articles.votes, COUNT(comments.article_id) as comment_count FROM articles
        LEFT JOIN comments
            ON articles.article_id = comments.article_id
        WHERE topic = 'mitch' 
        GROUP BY articles.article_id
        ORDER BY articles.article_id;
