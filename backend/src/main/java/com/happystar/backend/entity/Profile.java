package com.happystar.backend.entity;

import jakarta.persistence.*;
/** 下記は↑で省略できる。処理負荷には影響ないらしい
// import jakarta.persistence.Column;
// import jakarta.persistence.ElementCollection;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.PrePersist;
// import jakarta.persistence.Table;
*/

import lombok.*;

import java.util.ArrayList;
import java.sql.Types;
/** 下記は↑で省略できる。処理負荷には影響ないらしい
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;
*/

/**
// 名前省略について
// 個数が少なくなっていいが名前の衝突（バグ）もある。
// 例えば、List という名前の道具は、java.util.List（普通のリスト）と
// java.awt.List（画面表示用のリスト）の2種類あります。両方を * でインポートしてしまうとエラーが出ます。
*/

/**
// import java.util.UUID; // Java標準のUUIDクラス
// ブラウザとやり取りする際は文字列のほうが取り回しやすい。使うときは型をUUIDにするとき
*/
import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;

/**
// 1. クラス全体にかかるもの
// import jakarta.persistence.Entity;
//   @Entity
//     「DBのテーブルと1対1で対応するよ！」 という宣言。
//     これがないと、ただのメモリ上のデータとして扱われ、
//     DBには保存されません。
//
// import jakarta.persistence.Table;
//   @Table(name = "profiles")
//     DB側のテーブル名を指定。
//     書かない場合はクラス名（Profile）が
//     そのままテーブル名になりますが、
//     Prisma側でテーブル名を複数形（profiles）にしているなら、
//     ここで名前を合わせておく必要があります。
*/

/**
// 2.主キー（ID）に関する
// import jakarta.persistence.Id;
//   @Id
//     「この項目が Primary Key（主キー） だよ！」という印です。
// import jakarta.persistence.GeneratedValue;
//   @GeneratedValue(strategy = GenerationType.IDENTITY)
//     IDを 「自動採番（オートインクリメント）」 する設定です。
//     Prismaの id Int @id @default(autoincrement()) と
//     全く同じ意味ですね。
//
// import jakarta.persistence.GenerationType;
//   @GeneratedValue(strategy = GenerationType.IDENTITY) というセットで使いますが、
//     この中の GenerationType が何者なのかをJavaに教えてあげる必要があります。
//     これも「ID（主キー）をどうやって発行するか」というルールの種類を指定する
*/

/**
// 3. カラムの詳細設定
// import jakarta.persistence.Column;
//   @Column
//     Javaの変数名とDBのカラム名が違うときに使います。
//     例：@Column(name = "full_name", nullable = false) と書くと、
//     DBでは full_name という名前で、空っぽ（null）は禁止だよ」と
//     いう細かいルールを教えられます。
*/

/***
// 3. カラムの詳細設定
//  import jakarta.persistence.Column;
//    @Column
//      Javaの変数名とDBのカラム名が違うときに使います。
//      例：@Column(name = "full_name", nullable = false) と書くと、
//      DBでは full_name という名前で、空っぽ（null）は禁止だよ」と
//      いう細かいルールを教えられます。
*/

/***
// 4. 特殊なタイミングの魔法
//  import jakarta.persistence.PrePersist;
//    @PrePersist
//      「DBに保存（Insert）される直前に、この処理を自動で実行して！」 という予約です。
//      よくある使い道は、「作成日時（createdAt）」をその瞬間の時間で自動セットするときなどに使います。
*/

/***
 * // 上記のようなものを「アノテーション」
 * // Javaの普通のクラスに 「お前はただのクラスじゃない、DBと繋がる特別な存在だ！」 という魔法をかけるラベルのようなもの。
 * // 専門用語でいうと JPA (Java Persistence API) という仕組みの部品たちです。
 * //
 * // @Data が自動でやってくれること：
 * // Getter / Setter: すべての変数分。
 * // toString(): System.out.println(profile) した時に中身を綺麗に見せてくれる。
 * // equals() / hashCode(): オブジェクト同士の比較を正しくできるようにする。
 * // RequiredArgsConstructor: final がついた変数を初期化するコンストラクタ。
 */

@Data
@Entity
@Table(name = "profile")
// @NoArgsConstructor // 引数なしコンストラクタ（JPAに必要）
// @AllArgsConstructor // 全項目コンストラクタ（テスト等で便利）
public class Profile {
    @Id
    @JdbcTypeCode(java.sql.Types.VARCHAR)
    private String id;

    private String myname;

    private String location;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id") // TechStack側にあるはずの、親を指すカラム名だにょ
    private List<TechStack> techStack = new ArrayList<>();

    private String licenses;
}
